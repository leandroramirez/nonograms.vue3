<script>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { crossColorKey } from "/@/consts/reservedColorKeys.js"

export default {
  props: {
    pixels: Array,
    width: Number,
    colors: Object,
    textColors: Object
  },
  setup(props, { emit }) {
    const newColor = ref(null)

    const onMouseDown = index => {
      emit("click", index)
      newColor.value = props.pixels[index]
    }
    const onMouseEnter = index => {
      if (newColor.value !== null) {
        emit("setColor", { index, newColor: newColor.value })
      }
    }
    const onMouseUp = () => {
      newColor.value = null
    }

    onMounted(() => {
      document.addEventListener("mouseup", onMouseUp)
    })
    onUnmounted(() => {
      document.removeEventListener("mouseup", onMouseUp)
    })

    return {
      onMouseDown,
      onMouseEnter,
      onMouseUp,
      crossColorKey,
    }
  },
}
</script>

<template>
  <div class="nng-grid" :style="`grid-template-columns: repeat(${width}, 1fr);`">
    <!-- eslint-disable-next-line vue/require-v-for-key -->
    <svg
      v-for="(value, index) of pixels"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      xmlns:xhtml="http://www.w3.org/1999/xhtml"
      class="nng-square"
      :style="`background: ${colors[value]}; color: ${textColors[value]};`"
      @mousedown="onMouseDown(index)"
      @mouseenter="onMouseEnter(index)"
    >
      <foreignObject x="0" y="0" width="100%" height="100%">{{ value === crossColorKey ? 'X': '' }}</foreignObject>
    </svg>
  </div>
</template>

<style>
.nng-grid {
  display: grid;
  grid-gap: 1px;
  background: #333;
  border: 1px solid #333;
}
.nng-grid .nng-square {
  cursor: pointer;
} 
</style>
