module.exports = {
  purge: [
    './src/**/*.vue',
    './index.html',
  ],
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
}