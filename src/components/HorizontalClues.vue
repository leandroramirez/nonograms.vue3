<script>
import Square from "/@/components/Square.vue"

export default {
  components: {
    Square
  },
  props: {
    clues: Array,
    maxLength: Number,
    colors: Object
  }
}
</script>

<template>
  <div class="nng-horizontal-clues" :style="`grid-template-columns: repeat(${maxLength}, 1fr);`">
    <template v-for="clueGroup in clues">
      <!-- eslint-disable-next-line vue/no-unused-vars vue/require-v-for-key -->
      <div v-for="clue in maxLength - clueGroup.length" class="nng-square nng-square-empty"/>
      <!-- eslint-disable-next-line vue/valid-v-for -->
      <Square v-for="clue in clueGroup" :color="clue.realColor">{{ clue.length }}</Square>
    </template>
  </div>
</template>

<style>
.nng-horizontal-clues {
  display: grid;
  grid-gap: 1px;
  background: #333;
  border: 1px solid #333;
}
</style>
