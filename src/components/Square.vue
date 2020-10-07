<script>
import { computed } from 'vue'

export default {
  props: {
    color: String
  },
  setup(props) {
    const getContrastYIQ = hexcolor => {
        // From https://24ways.org/2010/calculating-color-contrast/
        const r = parseInt(hexcolor.substr(1, 2), 16)
        const g = parseInt(hexcolor.substr(3, 2), 16)
        const b = parseInt(hexcolor.substr(5, 2), 16)
        const yiq = (r * 299 + g * 587 + b * 114) / 1000
        return yiq >= 128 ? "black" : "white"
    }
    
    const textColor = computed(() => getContrastYIQ(props.color))

    return { textColor }
  }
}
</script>

<template>
  <svg
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    class="nng-square"
    :style="`background: ${color}; color: ${textColor};`"
  >
    <foreignObject x="0" y="0" width="100" height="100"><slot></slot></foreignObject>
  </svg>
</template>
