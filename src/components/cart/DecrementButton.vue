<template>
  <button type="button" @click="$emit('click')">
    <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" fill="#F2F2F2" r="11.5" stroke="#E0E0E0"></circle>
      <path d="M14.158 12.332H10.7V11.275H14.158V12.332Z" fill="#333333"></path>
    </svg>
  </button>
</template>
<script>
export default {}
</script>
<style lang="scss">
button {
  border: none;
  background: transparent;
}
</style>
