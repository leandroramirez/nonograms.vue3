<script>
import Clue from "/@/components/Clue.vue"

export default {
  components: {
    Clue
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
      <Clue v-for="clue in clueGroup" :clue="clue" :colors="colors"/>
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
