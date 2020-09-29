<template>
  <header class="flex items-center mb-4">
    <img class="w-20 mr-4" src="./assets/logo.png">
    <div>
      <h1>Nonograms game PoC</h1>
      Developed using Vue.js 3.0 + Vite 1.0
    </div>
  </header>
  <router-view />
</template>

<script>
export default {
  name: 'App',
}
</script>
