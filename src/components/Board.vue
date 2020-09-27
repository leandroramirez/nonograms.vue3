<script>
import { ref, computed } from 'vue'
import Grid from "/@/components/Grid.vue"
import HorizontalClues from "/@/components/HorizontalClues.vue"
import VerticalClues from "/@/components/VerticalClues.vue"
import {
  crossColorKey,
  reservedColorKeys
} from "/@/consts/reservedColorKeys.js"
import useClues from "/@/composables/useClues.js"
import useColors from "/@/composables/useColors.js"

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

    const {
      colors,
      textColors,
      backgroundColor,
    } = useColors(props.nonogram)

    const {
      horizontalClues,
      horizontalCluesMaxLength,
      verticalClues,
      verticalCluesMaxLength,
    } = useClues(props.nonogram, textColors, backgroundColor)

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
    <div class="nng-board">
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

<style vars="{
  nngBoardGridTemplateColumns: `${horizontalCluesMaxLength}fr ${nonogram.width}fr`,
  nngBoardMaxWidth: `${(horizontalCluesMaxLength + nonogram.width) * 3}em`,
}">
/* I don't like the "scoped" option: I don't want data-v-XXXXXXXX attribute spread in all DOM elements. */
.nng-board {
  display: grid;
  user-select: none;
  margin: 0 auto;
  grid-template-columns: var(--nngBoardGridTemplateColumns);
  max-width: var(--nngBoardMaxWidth);
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
