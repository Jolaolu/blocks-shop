import './composition-api'
import Vue from 'vue'
import { CreateElement } from 'vue/types'
import { createApp } from '@vue/composition-api'
import App from './App.vue'

Vue.config.productionTip = false

const app = createApp({
  render: (h: CreateElement) => h(App),
})
app.mount('#app')
