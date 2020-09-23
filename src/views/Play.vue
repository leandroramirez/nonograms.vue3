<template>
  <div>
    <h2>Playing "{{ nonogram.name }}" nonogram</h2>
    <Board :nonogram="nonogram"/>
    <router-link :to="{ name: 'home' }">Back to home</router-link>
  </div>
</template>

<script>
import Board from "/@/components/Board.vue";
import { nonograms } from "/@/assets/nonograms.js";

export default {
  components: {
    Board
  },
  props: {
    id: String
  },
  computed: {
    nonogram() {
      return nonograms.find(n => n.id === this.id);
    }
  }
};
</script>

