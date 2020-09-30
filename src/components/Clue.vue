<script>
export default {
  props: {
    clue: Object,
    colors: Object
  }
}
</script>

<template>
  <svg
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    xmlns:xhtml="http://www.w3.org/1999/xhtml"
    class="nng-square"
    :style="`background: ${clue.realColor}; color: ${clue.textColor};`"
  >
    <foreignObject x="0" y="0" width="100%" height="100%">{{ clue.length }}</foreignObject>
  </svg>
</template>
