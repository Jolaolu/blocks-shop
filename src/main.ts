import Vue from 'vue'
import { CreateElement } from 'vue/types'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: (h: CreateElement) => h(App),
}).$mount('#app')
