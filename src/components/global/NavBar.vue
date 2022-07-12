<template>
  <header class="navbar">
    <div class="navbar-logo">UP42</div>
    <div class="navbar-info">
      <p class="navbar-info__balance">Available Credits: {{ 10000 }}</p>
      <svg height="15" width="17" xmlns="http://www.w3.org/2000/svg" aria-label="cart">
        <path
          d="M15.814 12.856a2.144 2.144 0 1 0-4.287 0 2.144 2.144 0 0 0 4.287 0zm-2.791 0a.646.646 0 1 1 1.288 0 .646.646 0 0 1-1.286 0h-.002zm2.438-10.143V2.71a1.498 1.498 0 0 1 1.454 1.857l-1.022 4.14a1.872 1.872 0 0 1-1.818 1.424H6.482c-.867 0-1.62-.593-1.822-1.436L3.003 1.784a.374.374 0 0 0-.363-.286H.749A.749.749 0 0 1 .749 0h1.889c.866 0 1.62.594 1.822 1.436l1.656 6.912a.376.376 0 0 0 .364.287h7.595a.374.374 0 0 0 .363-.285l1.023-4.14H9.74a.749.749 0 1 1 0-1.497h5.72zM6.403 15a2.144 2.144 0 1 1 0-4.287 2.144 2.144 0 0 1 0 4.287zm0-2.791v.001a.646.646 0 1 0 0-.002z"
          fill="currentColor"
        />
      </svg>
    </div>
  </header>
</template>
<style lang="scss">
.navbar {
  display: flex;
  width: 100%;
  justify-content: space-between;
  &-logo {
    font-size: 3rem;
    font-weight: 600;
  }
  &-info {
    display: flex;
    align-items: center;
    color: $black;
    font-weight: 700;
    &__balance {
      margin-right: 2.5rem;
    }
  }
}
</style>
