<template>
  <div class="home container">
    <nav-bar @show-cart="showCart" :credit-balance="userCredits" :cart-items-count="cartItemsCount" />
    <transition name="fade">
      <main class="home-content">
        <template v-if="isLoading">
          <base-loader v-for="x in 12" :key="x" />
        </template>
        <template v-else>
          <product-card
            v-for="(product, index) in allProducts"
            :key="index"
            :product="product"
            @add-to-cart="addToCart"
          />
        </template>
        <aside class="home-content__cart" :class="[isCartShown ? '-open' : '']">
          <transition name="fade-slide-left-animate" mode="out-in">
            <cart-manager
              v-if="isCartShown"
              :cart="productCart"
              :credit-balance="userCredits"
              @close="showCart"
              @increment-item="incrementCartItem"
              @decrement-item="decrementCartItem"
              @remove-item="removeFromCart"
              @empty-cart="emptyCart"
              @purchase-items="purchaseItems"
            />
          </transition>
        </aside>
      </main>
    </transition>
  </div>
</template>
<script lang="ts">
import Vue, { onMounted, ref, computed, defineComponent, set } from 'vue'
import NavBar from '~/components/global/NavBar.vue'
import ProductCard from '~/components/ProductCard.vue'
import HttpService from '~/services/index'
import CartManager from '~/components/cart/CartManager.vue'
import { IProduct, ICart } from '~/services/interfaces'
import BaseLoader from '~/components/global/BaseLoader.vue'

export default defineComponent({
  name: 'HomeView',
  components: { ProductCard, NavBar, CartManager, BaseLoader },
  setup() {
    const userCredits = ref<number>(10000)
    const isCartShown = ref<boolean>(false)
    const isLoading = ref<boolean>(true)
    const productCart = ref<ICart>({})
    const allProducts = ref<IProduct[]>([])
    const http = new HttpService({
      baseUrl: 'api',
      baseHeaders: {
        mode: 'no-cors',
      },
    })

    const addToCart = (product: IProduct): void => {
      if (product.id in productCart.value) {
        Vue.$toast.success('updated item in your cart 🥳')
        productCart.value[product.id].quantity += 1
      } else {
        Vue.$toast.success('Added item to cart 🥳')
        set(productCart.value, product.id, { product, quantity: 1 })
      }
    }

    const removeFromCart = (id: string): void => {
      // using Vue.delete because Vue doesnt expose the `delete` method as module import anatively.
      Vue.delete(productCart.value, id)
    }

    const emptyCart = (): void => {
      // in here, we reset the `productCart` to an empty object
      productCart.value = {}
    }

    const showCart = (): void => {
      isCartShown.value = !isCartShown.value
    }

    const incrementCartItem = (id: string): void => {
      productCart.value[id].quantity += 1
    }

    const decrementCartItem = (id: string): void => {
      if (productCart.value[id].quantity === 1) {
        return
      }
      productCart.value[id].quantity -= 1
    }

    const purchaseItems = (totalPurchasePrice: number): void => {
      userCredits.value = userCredits.value - totalPurchasePrice
      Vue.$toast.success('Purchase complete!')
      emptyCart()
      showCart()
    }

    const cartItemsCount = computed<number>(() => {
      let total = 0
      Object.values(productCart.value).forEach((product) => {
        total = total + product.quantity
      })
      return total
    })

    onMounted(async () => {
      await http
        .get('marketplace/blocks', {})
        .then((response): void => {
          isLoading.value = false
          allProducts.value = response?.data.filter(
            (product: IProduct) => product.metadata.blockPricingStrategy.name === 'simple'
          )
        })
        .catch((error) => {
          console.log(error?.message)
          Vue.$toast.error(error.message as string)
        })
    })
    return {
      addToCart,
      allProducts,
      cartItemsCount,
      decrementCartItem,
      emptyCart,
      incrementCartItem,
      isCartShown,
      isLoading,
      productCart,
      purchaseItems,
      removeFromCart,
      showCart,
      userCredits,
    }
  },
})
</script>
<style lang="scss">
.home {
  position: relative;
  padding: 2rem 2rem;
  @include screen(custom, 'min', 576) {
    padding: 2rem 4rem;
  }
  &-content {
    display: grid;
    padding-top: 8rem;
    gap: 3rem 3rem;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    @include screen(custom, 'max', 576) {
      grid-template-columns: 1fr;
      padding-to: 4rem;
    }
    @include screen('med') {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    &__cart {
      position: sticky;
      top: 0;
      right: 0;
      bottom: 0;
      display: none;
      width: 100%;
      @include screen(custom, 'min', 576) {
        width: 35%;
      }
      overflow-y: scroll;
      &.-open {
        position: fixed;
        z-index: 3;
        display: block;
      }
    }
  }
}
</style>
