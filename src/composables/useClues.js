import { computed } from 'vue'

export default function useClues(nonogram, backgroundColor) {
  const getClues = (linesLength, pixelsLength, getPixelFn) => {
    const clues = []
    for (let lineIndex = 0; lineIndex < linesLength; lineIndex++) {
      let cluesGroup = []
      let currentClue = {}
      for (let pixelIndex = 0; pixelIndex < pixelsLength; pixelIndex++) {
        const pixel = getPixelFn(lineIndex, pixelIndex)
  
        if (pixel === currentClue.color) {
          currentClue.length++
          continue
        }
  
        if (pixel === backgroundColor.value) {
          currentClue = {}
          continue
        }
  
        currentClue = {
          color: pixel,
          realColor: nonogram.colors[pixel],
          length: 1,
          completed: false
        }
        cluesGroup.push(currentClue)
      }
  
      clues.push(cluesGroup)
    }
    return clues
  }
  const getMaxLengthInnerArray = array => {
    let maxLength = 0
    for (let innerArray of array) {
      if (innerArray.length > maxLength) {
        maxLength = innerArray.length
      }
    }
    return maxLength
  }

  const horizontalClues = computed(() => {
    const width = nonogram.width
    const pixels = nonogram.pixels
    return getClues(
      nonogram.height,
      width,
      (lineIndex, pixelIndex) => pixels[lineIndex * width + pixelIndex]
    )
  })
  const horizontalCluesMaxLength = computed(() => {
    return getMaxLengthInnerArray(horizontalClues.value)
  })
  const verticalClues = computed(() => {
    const width = nonogram.width
    const pixels = nonogram.pixels
    return getClues(
      width,
      nonogram.height,
      (lineIndex, pixelIndex) => pixels[pixelIndex * width + lineIndex]
    )
  })
  const verticalCluesMaxLength = computed(() => {
    return getMaxLengthInnerArray(verticalClues.value)
  })
  
  
  return {
    horizontalClues,
    horizontalCluesMaxLength,
    verticalClues,
    verticalCluesMaxLength
  }
}
