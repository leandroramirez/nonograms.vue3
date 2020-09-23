const path = require('path');
module.exports = {
  alias: {
    '/@/': path.resolve(__dirname, './src')
  },
  // FIXME: It doesn't work in Vite (NODE_ENV is undefined)
  // base: process.env.NODE_ENV === 'production'
  //   ? '/nonograms.vue3'
  //   : '/'
  //
  // Workarond:
  base: process.env.npm_lifecycle_event === 'build'
    ? '/nonograms.vue3'
    : '/',
  // Default value is '_assets'. The underscore make this folder hidden in gh_pages, so I redefine it.
  assetsDir: 'assets'
}