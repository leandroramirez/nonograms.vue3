<!--
  3 ways to create composition API components. To me, the "no script setup" style is more legible.
-->

<!-- no script setup -->
<script>
import Board from "/@/components/Board.vue"
import { fetchNonogram } from "/@/api/nonograms.js"
import { ref } from 'vue'

export default {
  props: {
    id: String,
  },
  components: {
    Board,
  },
  setup (props) {
    const nonogram = ref(null)
    const loadNonogram = async (id) => {
      //TODO: handle exceptios
      nonogram.value = await fetchNonogram(id)
    }
    loadNonogram(props.id)

    return { nonogram, loadNonogram }
  },
}
</script>

<!-- script setup as RFC says -->
<!-- 
<script setup="props">
import { fetchNonogram } from "/@/api/nonograms.js"
import { ref } from 'vue'

export default {
  props: {
    id: String,
  }
}
export { default as Board } from "/@/components/Board.vue"

export const nonogram = ref(null)
export const loadNonogram = async (id) => {
  //TODO: handle exceptios
  nonogram.value = await fetchNonogram(id)
}
loadNonogram(props.id)
</script>
-->

<!-- script setup variant to reduce "export" declarations -->
<!-- 
<script setup="props">
import Board from "/@/components/Board.vue"
import { fetchNonogram } from "/@/api/nonograms.js"
import { ref } from 'vue'

const nonogram = ref(null)
const loadNonogram = async (id) => {
  //TODO: handle exceptios
  nonogram.value = await fetchNonogram(id)
}
loadNonogram(props.id)

export { Board, nonogram, loadNonogram }
export default {
  props: {
    id: String,
  }
}
</script>
-->

<template>
  <div v-if="nonogram">
    <h2>Playing "{{ nonogram.name }}" nonogram</h2>
    <Board :nonogram="nonogram"/>
    <div class="mt-4">
      <router-link :to="{ name: 'home' }" class="font-semibold">👈 Back to home</router-link>
    </div>
  </div>
</template>
