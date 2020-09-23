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

<script>
import Grid from "/@/components/Grid.vue";
import HorizontalClues from "/@/components/HorizontalClues.vue";
import VerticalClues from "/@/components/VerticalClues.vue";
import {
  crossColorKey,
  reservedColorKeys
} from "/@/consts/reservedColorKeys.js";

export default {
  components: {
    Grid,
    HorizontalClues,
    VerticalClues
  },
  props: {
    nonogram: Object
  },
  data() {
    return {
      selectedColor: null,
      userPixels: null
    };
  },
  created() {
    this.selectedColor = Object.keys(this.nonogram.colors)[1];
    this.userPixels = Array(this.nonogram.pixels.length).fill(
      this.backgroundColor
    );
  },
  methods: {
    click(index) {
      const pixel = this.userPixels[index];
      const newValue =
        pixel === this.backgroundColor
          ? this.selectedColor
          : pixel === this.selectedColor
          ? crossColorKey
          : this.backgroundColor;

      this.userPixels[index] = newValue;
    },
    setColor({ index, newColor }) {
      this.userPixels[index] = newColor;
    },
    getMaxLengthInnerArray(array) {
      let maxLength = 0;
      for (let innerArray of array) {
        if (innerArray.length > maxLength) {
          maxLength = innerArray.length;
        }
      }
      return maxLength;
    },
    getContrastYIQ(hexcolor) {
      // From https://24ways.org/2010/calculating-color-contrast/
      var r = parseInt(hexcolor.substr(1, 2), 16);
      var g = parseInt(hexcolor.substr(3, 2), 16);
      var b = parseInt(hexcolor.substr(5, 2), 16);
      var yiq = (r * 299 + g * 587 + b * 114) / 1000;
      return yiq >= 128 ? "black" : "white";
    },
    getClues(linesLength, pixelsLength, getPixelFn) {
      const clues = [];
      for (let lineIndex = 0; lineIndex < linesLength; lineIndex++) {
        let cluesGroup = [];
        let currentClue = {};
        for (let pixelIndex = 0; pixelIndex < pixelsLength; pixelIndex++) {
          const pixel = getPixelFn(lineIndex, pixelIndex);

          if (pixel === currentClue.color) {
            currentClue.length++;
            continue;
          }

          if (pixel === this.backgroundColor) {
            currentClue = {};
            continue;
          }

          currentClue = {
            color: pixel,
            realColor: this.nonogram.colors[pixel],
            textColor: this.textColors[pixel],
            length: 1,
            completed: false
          };
          cluesGroup.push(currentClue);
        }

        clues.push(cluesGroup);
      }
      return clues;
    }
  },
  computed: {
    backgroundColor() {
      return Object.keys(this.nonogram.colors)[0];
    },
    isSolved() {
      if (!this.userPixels) {
        return false;
      }
      const nonogramPixels = this.nonogram.pixels;
      const length = nonogramPixels.length;
      for (let i = 0; i < length; i++) {
        // All reserved color keys are interpreted os background color
        const pixel = reservedColorKeys.includes(this.userPixels[i])
          ? this.backgroundColor
          : this.userPixels[i];
        if (pixel !== nonogramPixels[i]) {
          return false;
        }
      }
      return true;
    },
    horizontalClues() {
      const width = this.nonogram.width;
      const pixels = this.nonogram.pixels;
      return this.getClues(
        this.nonogram.height,
        width,
        (lineIndex, pixelIndex) => pixels[lineIndex * width + pixelIndex]
      );
    },
    horizontalCluesMaxLength() {
      return this.getMaxLengthInnerArray(this.horizontalClues);
    },
    verticalClues() {
      const width = this.nonogram.width;
      const pixels = this.nonogram.pixels;
      return this.getClues(
        width,
        this.nonogram.height,
        (lineIndex, pixelIndex) => pixels[pixelIndex * width + lineIndex]
      );
    },
    verticalCluesMaxLength() {
      return this.getMaxLengthInnerArray(this.verticalClues);
    },
    colors() {
      const colors = Object.assign({}, this.nonogram.colors);
      console.log(colors);
      reservedColorKeys.reduce((colors, r) => {
        colors[r] = colors[this.backgroundColor];
        console.log(r, colors[r]);
        return colors;
      }, colors);

      return colors;
    },
    textColors() {
      const colors = this.colors;
      return Object.keys(colors).reduce((textColors, colorKey) => {
        textColors[colorKey] = this.getContrastYIQ(colors[colorKey]);
        return textColors;
      }, {});
    }
  }
};
</script>

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
