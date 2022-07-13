import Vue from 'vue'
import { CreateElement } from 'vue/types'
import Toast from 'vue-toastification'
import App from './App.vue'
import 'vue-toastification/dist/index.css'

Vue.config.productionTip = false
Vue.use(Toast)

new Vue({
  render: (h: CreateElement) => h(App),
}).$mount('#app')
