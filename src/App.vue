<template>
  <div id="app">
    <home-view />
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import HomeView from './views/HomeView.vue'
export default defineComponent({
  components: {
    HomeView,
  },
})
</script>
<style lang="scss">
#app {
  min-height: 100vh;
  background: $background-color;
  color: #2c3e50;
  font-family: $font-primary;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
