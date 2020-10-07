import { computed } from 'vue'
import { reservedColorKeys } from "/@/consts/reservedColorKeys.js"

export default function useColors(nonogram) {
  const colors = computed(() => {
    const colors = Object.assign({}, nonogram.colors)
    reservedColorKeys.reduce((colors, r) => {
      colors[r] = colors[backgroundColor.value]
      console.log(r, colors[r])
      return colors
    }, colors)

    return colors
  })
  const backgroundColor = computed(() => {
    return Object.keys(nonogram.colors)[0]
  })

  return {
    colors,
    backgroundColor,
  }
}
