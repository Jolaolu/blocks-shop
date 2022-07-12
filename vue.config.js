var path = require('path')
const { defineConfig } = require('@vue/cli-service')
const vueSrc = './src'
module.exports = defineConfig({
  css: {
    loaderOptions: {
      sass: {
        additionalData: '@import "@/assets/scss/main.scss";',
      },
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        '~': path.resolve(__dirname, vueSrc),
      },
    },
  },
  transpileDependencies: true,
})
