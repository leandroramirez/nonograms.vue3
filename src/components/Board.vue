<!-- TODO: Decouple responsabilities -->
<script>
import { ref, computed } from 'vue'
import Grid from "/@/components/Grid.vue"
import HorizontalClues from "/@/components/HorizontalClues.vue"
import VerticalClues from "/@/components/VerticalClues.vue"
import {
  crossColorKey,
  reservedColorKeys
} from "/@/consts/reservedColorKeys.js"

export default {
  components: {
    Grid,
    HorizontalClues,
    VerticalClues
  },
  props: {
    nonogram: Object
  },
  setup (props) {
    const selectedColor = ref(null)
    const userPixels = ref(null)

    const click = index => {
      const pixel = userPixels.value[index]
      const newValue =
        pixel === backgroundColor.value
          ? selectedColor.value
          : pixel === selectedColor.value
          ? crossColorKey
          : backgroundColor.value

      userPixels.value[index] = newValue
    }
    const setColor = ({ index, newColor }) => {
      userPixels.value[index] = newColor
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
    const getContrastYIQ = hexcolor => {
      // From https://24ways.org/2010/calculating-color-contrast/
      var r = parseInt(hexcolor.substr(1, 2), 16)
      var g = parseInt(hexcolor.substr(3, 2), 16)
      var b = parseInt(hexcolor.substr(5, 2), 16)
      var yiq = (r * 299 + g * 587 + b * 114) / 1000
      return yiq >= 128 ? "black" : "white"
    }
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
            realColor: props.nonogram.colors[pixel],
            textColor: textColors.value[pixel],
            length: 1,
            completed: false
          }
          cluesGroup.push(currentClue)
        }

        clues.push(cluesGroup)
      }
      return clues
    }

    const backgroundColor = computed(() => {
      return Object.keys(props.nonogram.colors)[0]
    })
    const isSolved = computed(() => {
      if (!userPixels.value) {
        return false
      }
      const nonogramPixels = props.nonogram.pixels
      const length = nonogramPixels.length;
      for (let i = 0; i < length; i++) {
        // All reserved color keys are interpreted os background color
        const pixel = reservedColorKeys.includes(userPixels.value[i])
          ? backgroundColor.value
          : userPixels.value[i]
        if (pixel !== nonogramPixels[i]) {
          return false
        }
      }
      return true
    })
    const horizontalClues = computed(() => {
      const width = props.nonogram.width
      const pixels = props.nonogram.pixels
      return getClues(
        props.nonogram.height,
        width,
        (lineIndex, pixelIndex) => pixels[lineIndex * width + pixelIndex]
      )
    })
    const horizontalCluesMaxLength = computed(() => {
      return getMaxLengthInnerArray(horizontalClues.value)
    })
    const verticalClues = computed(() => {
      const width = props.nonogram.width
      const pixels = props.nonogram.pixels
      return getClues(
        width,
        props.nonogram.height,
        (lineIndex, pixelIndex) => pixels[pixelIndex * width + lineIndex]
      )
    })
    const verticalCluesMaxLength = computed(() => {
      return getMaxLengthInnerArray(verticalClues.value)
    })
    const colors = computed(() => {
      const colors = Object.assign({}, props.nonogram.colors)
      console.log(colors)
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

    selectedColor.value = Object.keys(props.nonogram.colors)[1]
    userPixels.value = Array(props.nonogram.pixels.length).fill(
      backgroundColor.value
    )

    return {
      selectedColor,
      userPixels,
      click,
      setColor,
      isSolved,
      horizontalClues,
      horizontalCluesMaxLength,
      verticalClues,
      verticalCluesMaxLength,
      colors,
      textColors,
    }
  },
}
</script>

<template>
  <div>
    <div
      class="nng-board"
      :style="`grid-template-columns: ${horizontalCluesMaxLength}fr ${nonogram.width}fr; max-width: ${(horizontalCluesMaxLength + nonogram.width) * 3}em;`"
    >
      <div></div>
      <VerticalClues
        :clues="verticalClues"
        :maxLength="verticalCluesMaxLength"
        :colors="nonogram.colors"
      />
      <HorizontalClues
        :clues="horizontalClues"
        :maxLength="horizontalCluesMaxLength"
        :colors="nonogram.colors"
      />
      <Grid
        :pixels="userPixels"
        :width="nonogram.width"
        :colors="colors"
        :textColors="textColors"
        @click="click"
        @setColor="setColor"
      />
    </div>
    <h4>
      Colors:
      <template v-for="(color, colorKey, index) in nonogram.colors">
        <label v-if="index" :key="colorKey">
          <input type="radio" v-model="selectedColor" :value="colorKey" />
          <span class="nng-square nng-color-option" style="display:inline-block; width: 1em; height: 1em;" :style="`background: ${color};`"></span>
        </label>
      </template>
    </h4>
    <h4>{{ isSolved ? 'SOLVED!' : 'Unsolved...' }}</h4>
  </div>
</template>

<style>
/* I don't like the "scoped" option: I don't want data-v-XXXXXXXX attribute spread in all DOM elements. */
.nng-board {
  display: grid;
  user-select: none;
  margin: 0 auto;
}

.nng-square {
  box-shadow: inset -1px 2px 8px -5px;
  font-size: 5em;
  line-height: 1.3em;
  text-align: center;
  background: #fff;
}
.nng-square-empty:after {
  content: "";
  display: block;
  padding-bottom: 100%;
}

.nng-color-option {
  display:inline-block;
  font-size: 2em;
  width: 1em;
  height: 1em;
  border: 1px solid #333;
}
</style>
