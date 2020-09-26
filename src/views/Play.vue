<template>
  <div>
    <h2>Playing "{{ nonogram.name }}" nonogram</h2>
    <Board :nonogram="nonogram"/>
    <router-link :to="{ name: 'home' }">Back to home</router-link>
  </div>
</template>

<script>
import Board from "/@/components/Board.vue";
import { fetchNonogram } from "/@/api/nonograms.js";

export default {
  components: {
    Board
  },
  props: {
    id: String
  },
  data () {
    return {
      nonogram: null,
    }
  },
  created () {
    this.loadNonogram(this.id)
  },
  methods: {
    loadNonogram (id) {
      fetchNonogram(id)
      .then(nonogram => {
        //TODO: handle null nonogram (not found)
        this.nonogram = nonogram
      })
      //TODO: handle catch (communication, auth, etc errors)
    },
  },
};
</script>

