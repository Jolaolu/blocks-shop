<template>
  <div class="loader"></div>
</template>
<style lang="scss">
.loader {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  -webkit-animation: 1.5s linear infinite;
  animation: loading-glow 1.5s linear infinite;
  background-color: #c9c9c9;
  background-position: center;
  background-size: cover;
  border-radius: 8px;
  grid-row-end: span 8;
  &:nth-child(even) {
    -webkit-animation-delay: 0.6s;
    animation-delay: 0.6s;
  }
}

@keyframes loading-glow {
  0% {
    background-color: #c9c9c9;
  }
  50% {
    background-color: #e6e6e6;
  }
  100% {
    background-color: #c9c9c9;
  }
}
</style>
