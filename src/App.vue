<template>
  <img class="nng-logo" src="./assets/logo.png">
  <h1 class="nng-title">Nonograms game PoC</h1>
  <h4 class="nng-subtitle">Built in Vue.js version 3.0</h4>
  <router-view/>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 1em;
}
.nng-title,
.nng-subtitle {
  text-align: left;
}
.nng-logo {
  width: 5em;
  float: left;
  margin-right: 1em;
}
</style>
