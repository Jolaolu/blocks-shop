// In order to have module level access to the composition api
// we need to register the composition api first
// using this workaround -> import inside main.ts

import Vue from 'vue'
import VueCompositionApi from '@vue/composition-api'

Vue.use(VueCompositionApi)
