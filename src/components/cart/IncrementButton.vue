<template>
  <button type="button" @click="$emit('click')">
    <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" fill="#F2F2F2" r="11.5" stroke="#E0E0E0"></circle>
      <path
        d="M15.406 11.772H12.557V14.782H11.535V11.772H8.7V10.827H11.535V7.838H12.557V10.827H15.406V11.772Z"
        fill="#333333"
      ></path>
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
