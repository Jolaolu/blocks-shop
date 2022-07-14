<template>
  <section class="cart">
    <div class="cart-header">
      <p>Cart</p>
      <button class="cart-close" @click="$emit('close')">
        <svg height="366" viewBox="0 0 365.7 365.7" width="366" xmlns="http://www.w3.org/2000/svg">
          <path
            d="m243.2 182.9 113.1-113.1c12.5-12.5 12.5-32.8 0-45.2l-15.1-15.1c-12.5-12.5-32.8-12.5-45.2 0l-113.1 113.1-113.1-113.2c-12.5-12.5-32.8-12.5-45.2 0l-15.1 15.1c-12.5 12.5-12.5 32.8 0 45.3l113.2 113.2-113.1 113.1c-12.5 12.5-12.5 32.8 0 45.3l15.1 15.1c12.5 12.5 32.8 12.5 45.2 0l113.1-113.1 113.1 113.1c12.5 12.5 32.8 12.5 45.3 0l15.1-15.1c12.5-12.5 12.5-32.8 0-45.2zm0 0"
          ></path>
        </svg>
      </button>
    </div>
    <div v-if="Object.keys(cart).length >= 1" class="cart-details">
      <ul>
        <li class="cart-details__list" v-for="(cartItem, index) in cart" :key="index">
          <div class="item-details">
            <h3 class="item-name">
              {{ cartItem.product.displayName }}
            </h3>
            <p class="item-price">
              {{ cartItem.product.metadata.blockPricingStrategy.credits }}
              {{ getNoun(cartItem.product.metadata.blockPricingStrategy.credits, 'credit') }}
            </p>
          </div>
          <div class="item-action">
            <decrement-button
              @click="$emit('decrement-item', cartItem.product.id)"
              :disabled="cartItem.quantity === 1"
            />
            <span>
              {{ cartItem.quantity }}
            </span>
            <increment-button @click="$emit('increment-item', cartItem.product.id)" />
            <button type="button" class="item-remove" @click="$emit('remove-item', cartItem.product.id)">
              <svg viewBox="0 0 477.9 477.9" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M443.7 68.3H324.3V51.2c0-28.3-22.9-51.2-51.2-51.2h-68.3c-28.3 0-51.2 22.9-51.2 51.2v17.1H34.1c-9.4 0-17.1 7.6-17.1 17.1s7.7 17 17.1 17h18.6l32.6 360c.8 8.8 8.2 15.6 17.1 15.5h273.1c8.9 0 16.3-6.7 17.1-15.5l32.6-360h18.6c9.4 0 17.1-7.6 17.1-17.1s-7.7-17-17.2-17zm-256-17.1c0-9.4 7.6-17.1 17.1-17.1h68.3c9.4 0 17.1 7.6 17.1 17.1v17.1H187.8V51.2zm172.2 392.5H118L87 102.4H390.8l-30.9 341.3z"
                />
                <path
                  d="M187.7 391.4v-.1l-17.1-238.9c-.7-9.4-8.9-16.5-18.3-15.9-9.4.7-16.5 8.9-15.9 18.3l17.2 238.9c.6 8.9 8.1 15.9 17.1 15.9h1.2c9.4-.7 16.5-8.8 15.8-18.2zM238.9 136.5c-9.4 0-17.1 7.6-17.1 17.1v238.9c0 9.4 7.6 17.1 17.1 17.1S256 402 256 392.5V153.6c0-9.4-7.6-17.1-17.1-17.1zM325.5 136.5c-9.4-.7-17.6 6.4-18.3 15.9l-17.1 238.9c-.7 9.4 6.4 17.6 15.8 18.3h1.3c9 0 16.4-6.9 17.1-15.9l17.1-238.9c.6-9.4-6.5-17.6-15.9-18.3z"
                />
              </svg>
            </button>
          </div>
        </li>
      </ul>
    </div>
    <div class="cart-details -empty" v-else>Uh Uh, There are no items in your cart yet. 🙈</div>
    <div>
      <div class="cart-empty">
        <button type="button" @click="$emit('empty-cart')">
          <svg viewBox="0 0 477.9 477.9" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M443.7 68.3H324.3V51.2c0-28.3-22.9-51.2-51.2-51.2h-68.3c-28.3 0-51.2 22.9-51.2 51.2v17.1H34.1c-9.4 0-17.1 7.6-17.1 17.1s7.7 17 17.1 17h18.6l32.6 360c.8 8.8 8.2 15.6 17.1 15.5h273.1c8.9 0 16.3-6.7 17.1-15.5l32.6-360h18.6c9.4 0 17.1-7.6 17.1-17.1s-7.7-17-17.2-17zm-256-17.1c0-9.4 7.6-17.1 17.1-17.1h68.3c9.4 0 17.1 7.6 17.1 17.1v17.1H187.8V51.2zm172.2 392.5H118L87 102.4H390.8l-30.9 341.3z"
            />
            <path
              d="M187.7 391.4v-.1l-17.1-238.9c-.7-9.4-8.9-16.5-18.3-15.9-9.4.7-16.5 8.9-15.9 18.3l17.2 238.9c.6 8.9 8.1 15.9 17.1 15.9h1.2c9.4-.7 16.5-8.8 15.8-18.2zM238.9 136.5c-9.4 0-17.1 7.6-17.1 17.1v238.9c0 9.4 7.6 17.1 17.1 17.1S256 402 256 392.5V153.6c0-9.4-7.6-17.1-17.1-17.1zM325.5 136.5c-9.4-.7-17.6 6.4-18.3 15.9l-17.1 238.9c-.7 9.4 6.4 17.6 15.8 18.3h1.3c9 0 16.4-6.9 17.1-15.9l17.1-238.9c.6-9.4-6.5-17.6-15.9-18.3z"
            />
          </svg>
          <span>Empty Cart</span>
        </button>
      </div>
      <div class="item-total">
        <h3>Total:</h3>
        <span>{{ convertToLocaleSring(total) }} {{ getNoun(total, 'credit') }}</span>
      </div>
      <div>
        <base-button class="buy" @click="purchaseItems"> Buy Now </base-button>
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import Vue, { PropType, defineComponent, computed } from 'vue'
import { ICartItem } from '~/services/interfaces'
import { getNoun, convertToLocaleSring } from '~/helpers/index'
import DecrementButton from './DecrementButton.vue'
import IncrementButton from './IncrementButton.vue'
import BaseButton from '~/components/global/BaseButton.vue'
export default defineComponent({
  components: { IncrementButton, DecrementButton, BaseButton },
  props: {
    cart: {
      type: Object as PropType<Record<string, ICartItem>>,
      required: true,
    },
    creditBalance: {
      type: Number,
      required: true,
    },
  },
  setup(props, { emit }) {
    const total = computed<number>(() => {
      let total = 0
      Object.values(props.cart).forEach((product) => {
        total = total + product.quantity * product.product.metadata.blockPricingStrategy.credits
      })
      return total
    })
    const purchaseItems = (): void => {
      if (props.creditBalance > total.value) {
        emit('purchase-items', total.value)
      } else {
        Vue.$toast.info('You do not have enough credits.')
      }
    }
    return {
      convertToLocaleSring,
      getNoun,
      purchaseItems,
      total,
    }
  },
})
</script>
<style lang="scss">
.cart {
  overflow: hidden;
  height: 100%;
  padding: 3rem;
  background: $white;
  transition: all 0.3s ease-in-out;
  &-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &-close {
    border: none;
    background: transparent;
    box-shadow: 0px 4px 10px rgb(0 0 0 / 8%);
    color: $black;
    svg {
      width: 1rem;
      height: 1rem;
    }
  }
  &-details {
    height: 80%;
    padding-top: 4rem;
    overflow-y: scroll;
    text-align: left;
    &.-empty {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    &__list {
      display: flex;
      justify-content: space-between;
      padding: 1rem 0;
    }
  }
  &-empty {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 2rem;
    button {
      border: none;
      margin-top: 3rem;
      background: transparent;
    }
    svg {
      width: 1.4rem;
      height: 1.4rem;
      margin-right: 1rem;
    }
  }
  .item {
    &-name {
      margin-bottom: 0.7rem;
      font-size: 1.5rem;
      font-weight: 600;
    }
    &-price {
      font-size: 1.2rem;
    }
    &-action {
      display: flex;
      align-items: center;
    }
    &-remove {
      margin-left: 1.2rem;
      svg {
        width: 1.2rem;
        height: 1.2rem;
      }
    }
    &-total {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
  .buy {
    @include button;
    width: 100%;
    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
