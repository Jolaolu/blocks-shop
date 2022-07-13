<template>
  <header class="navbar">
    <div class="navbar-logo">UP42</div>
    <div class="navbar-info">
      <p class="navbar-info__balance">Available Credits: {{ convertToLocaleSring(creditBalance) }}</p>
      <button class="nav-cart" type="button" @click="$emit('show-cart')">
        <svg height="15" width="17" xmlns="http://www.w3.org/2000/svg" aria-label="cart">
          <path
            d="M15.814 12.856a2.144 2.144 0 1 0-4.287 0 2.144 2.144 0 0 0 4.287 0zm-2.791 0a.646.646 0 1 1 1.288 0 .646.646 0 0 1-1.286 0h-.002zm2.438-10.143V2.71a1.498 1.498 0 0 1 1.454 1.857l-1.022 4.14a1.872 1.872 0 0 1-1.818 1.424H6.482c-.867 0-1.62-.593-1.822-1.436L3.003 1.784a.374.374 0 0 0-.363-.286H.749A.749.749 0 0 1 .749 0h1.889c.866 0 1.62.594 1.822 1.436l1.656 6.912a.376.376 0 0 0 .364.287h7.595a.374.374 0 0 0 .363-.285l1.023-4.14H9.74a.749.749 0 1 1 0-1.497h5.72zM6.403 15a2.144 2.144 0 1 1 0-4.287 2.144 2.144 0 0 1 0 4.287zm0-2.791v.001a.646.646 0 1 0 0-.002z"
            fill="currentColor"
          />
        </svg>
        <div v-if="cartItemsCount >= 1" class="nav-cart__count">{{ cartItemsCount }}</div>
      </button>
    </div>
  </header>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { convertToLocaleSring } from '~/helpers/index'
export default defineComponent({
  emits: ['show-cart'],
  props: {
    creditBalance: {
      type: Number,
      required: true,
    },
    cartItemsCount: {
      type: Number,
      required: true,
    },
  },
  setup() {
    return {
      convertToLocaleSring,
    }
  },
})
</script>
<style lang="scss">
.navbar {
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 0 2rem;
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
    button {
      border: none;
      margin-right: 2rem;
      background: transparent;
    }
    .nav {
      &-cart {
        position: relative;
        &__count {
          position: absolute;
          top: -2rem;
          left: 2;
          width: 2rem;
          height: 2rem;
          padding: 0.3rem 0 0;
          animation-duration: 1.5s;
          animation-iteration-count: 10;
          animation-name: add-product;
          background: $green;
          border-radius: 100%;
          color: $white;
          font-size: 1.3rem;
          font-weight: 700;
          text-align: center;
        }
        svg {
          width: 2rem;
          height: 2rem;
        }
      }
    }
  }
}
@keyframes add-product {
  0% {
    margin-top: -5px;
  }

  25% {
    margin-top: 5px;
  }
  50% {
    margin-top: -5px;
  }
  75% {
    margin-top: 5px;
  }
  100% {
    margin-top: -5px;
  }
}
</style>
