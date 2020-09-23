<template>
  <div class="nng-grid" :style="`grid-template-columns: repeat(${width}, 1fr);`">
    <!-- eslint-disable-next-line vue/require-v-for-key -->
    <svg
      v-for="(value, index) of pixels"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      class="nng-square"
      :style="`background: ${colors[value]}; color: ${textColors[value]};`"
      @mousedown="onMouseDown(index)"
      @mouseenter="onMouseEnter(index)"
    >
      <foreignObject width="100%" height="100%">{{ value === crossColorKey ? 'X': '' }}</foreignObject>
    </svg>
  </div>
</template>

<script>
import { crossColorKey } from "/@/consts/reservedColorKeys.js";

export default {
  props: {
    pixels: Array,
    width: Number,
    colors: Object,
    textColors: Object
  },
  data() {
    return {
      newColor: null
    };
  },
  methods: {
    onMouseDown(index) {
      this.$emit("click", index);
      this.newColor = this.pixels[index];
    },
    onMouseEnter(index) {
      if (this.newColor !== null) {
        this.$emit("setColor", { index, newColor: this.newColor });
      }
    },
    onMouseUp() {
      this.newColor = null;
    }
  },
  computed: {
    crossColorKey() {
      return crossColorKey;
    }
  },
  created() {
    document.addEventListener("mouseup", this.onMouseUp);
  },
  unmounted() {
    document.removeEventListener("mouseup", this.onMouseUp);
  }
};
</script>

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
