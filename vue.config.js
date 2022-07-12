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
  devServer: {
    proxy: {
      '/api': {
        target: 'https://api.up42.com/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
  transpileDependencies: true,
})
