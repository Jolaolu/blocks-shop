<template>
  <div class="home container">
    <nav-bar />
  </div>
</template>
<script lang="ts">
import { ref } from 'vue'
import NavBar from '~/components/global/NavBar.vue'
export default {
  name: 'HomeView',
  components: { NavBar },
  setup() {
    const userCredits = ref<number>(10000)
    return {
      userCredits,
    }
  },
}
</script>
<style lang="scss">
.home {
  padding: 2rem 6rem;
}
</style>
