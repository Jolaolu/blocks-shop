<template>
  <div class="home">
    {{ userCredits }}
  </div>
</template>
<script lang="ts">
import { ref } from 'vue'
export default {
  name: 'HomeView',
  components: {},
  setup() {
    const userCredits = ref<number>(10000)
    return {
      userCredits,
    }
  },
}
</script>
