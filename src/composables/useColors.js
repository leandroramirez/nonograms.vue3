import { computed } from 'vue'
import { reservedColorKeys } from "/@/consts/reservedColorKeys.js"

export default function useColors(nonogram) {
  const getContrastYIQ = hexcolor => {
    // From https://24ways.org/2010/calculating-color-contrast/
    const r = parseInt(hexcolor.substr(1, 2), 16)
    const g = parseInt(hexcolor.substr(3, 2), 16)
    const b = parseInt(hexcolor.substr(5, 2), 16)
    const yiq = (r * 299 + g * 587 + b * 114) / 1000
    return yiq >= 128 ? "black" : "white"
  }

  const colors = computed(() => {
    const colors = Object.assign({}, nonogram.colors)
    reservedColorKeys.reduce((colors, r) => {
      colors[r] = colors[backgroundColor.value]
      console.log(r, colors[r])
      return colors
    }, colors)

    return colors
  })
  const textColors = computed(() => {
    return Object.keys(colors.value).reduce((textColors, colorKey) => {
      textColors[colorKey] = getContrastYIQ(colors.value[colorKey])
      return textColors
    }, {})
  })
  const backgroundColor = computed(() => {
    return Object.keys(nonogram.colors)[0]
  })

  return {
    colors,
    textColors,
    backgroundColor,
  }
}
