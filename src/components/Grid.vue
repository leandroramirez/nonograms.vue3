<script>
import { ref, onMounted, onUnmounted } from 'vue'
import { crossColorKey } from "/@/consts/reservedColorKeys.js"
import Square from "/@/components/Square.vue"

export default {
  components: {
    Square
  },
  props: {
    pixels: Array,
    width: Number,
    colors: Object,
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
    <Square
      v-for="(value, index) of pixels"
      :color="colors[value]"
      @pointerdown ="onPointerDown(index, $event)"
      @pointerenter ="onPointerEnter(index)"
    >
      {{ value === crossColorKey ? 'X': '' }}
    </Square>
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
