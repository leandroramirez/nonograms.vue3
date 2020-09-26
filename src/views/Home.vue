<template>
  <div class="nng-home">
    <h2>Menu</h2>

    <p>Choose the nonogram you want to play:</p>
    <ul class="nng-nonograms">
      <li v-for="nonogram in nonograms" :key="nonogram.id">
        <router-link
          class="nng-nonogram"
          :to="{ name: 'play', params: { id: nonogram.id } }"
        >{{ nonogram.name }}</router-link>
        <span
          class="nng-details"
        >{{ nonogram.width }}x{{ nonogram.height }}, {{ Object.keys(nonogram.colors).length > 2 ? Object.keys(nonogram.colors).length + ' colors' : 'b/w' }}.</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { fetchNonograms } from "/@/api/nonograms.js";

export default {
  data() {
    return {
      nonograms: null
    }
  },
  created () {
    this.loadNonograms()
  },
  methods: {
    loadNonograms () {
      fetchNonograms()
      .then(nonograms => {
        this.nonograms = nonograms
      })
      //TODO: handle catch (communication, auth, etc errors)
    },
  },
};
</script>

<style>
.nng-home a.nng-nonogram,
.nng-home a.nng-nonogram:visited {
  color: inherit;
  font-weight: bold;
  text-decoration: none;
}

.nng-home .nng-details {
  margin-left: 0.5em;
}
</style>