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
    const root = ref(null)

    const onPointerDown = (index, event) => {
      event.target.releasePointerCapture(event.pointerId)
      emit("click", index)
      newColor.value = props.pixels[index]
    }
    const onPointerEnter = index => {
      if (newColor.value !== null) {
        emit("setColor", { index, newColor: newColor.value })
      }
    }
    const onPointerUp = () => {
      newColor.value = null
    }

    onMounted(() => {
      document.addEventListener("pointerup", onPointerUp)
    })
    onUnmounted(() => {
      document.removeEventListener("pointerup", onPointerUp)
    })

    return {
      onPointerDown,
      onPointerEnter,
      crossColorKey,
      root,
    }
  },
}
</script>

<template>
  <div ref="root" class="nng-grid" :style="`grid-template-columns: repeat(${width}, 1fr);`">
    <!-- eslint-disable-next-line vue/require-v-for-key -->
    <svg
      v-for="(value, index) of pixels"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      class="nng-square"
      :style="`background: ${colors[value]}; color: ${textColors[value]};`"
      @pointerdown ="onPointerDown(index, $event)"
      @pointerenter ="onPointerEnter(index)"
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
  touch-action: none;
}
.nng-grid .nng-square {
  cursor: pointer;
} 
</style>
