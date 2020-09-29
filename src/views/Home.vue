<script setup>
import { fetchNonograms } from "/@/api/nonograms.js"
import { ref } from 'vue'

const nonograms = ref([])
const loadNonograms = async () => {
  //TODO: handle exceptios
  nonograms.value = await fetchNonograms()
}
loadNonograms()

export { nonograms, loadNonograms }
</script>

<template>
  <div class="nng-home">
    <h2>Menu</h2>

    <p>Choose the nonogram you want to play:</p>
    <ul>
      <li v-for="nonogram in nonograms" :key="nonogram.id">
        <router-link :to="{ name: 'play', params: { id: nonogram.id } }" class="font-semibold">
          👉 {{ nonogram.name }}
        </router-link>
        <span class="ml-2">
          {{ nonogram.width }}x{{ nonogram.height }}, {{ Object.keys(nonogram.colors).length > 2 ? Object.keys(nonogram.colors).length + ' colors' : 'b/w' }}.
        </span>
      </li>
    </ul>
  </div>
</template>
