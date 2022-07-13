<template>
  <div class="home container">
    <nav-bar @show-cart="showCart" :credit-balance="userCredits" :cart-items-count="cartItemsCount" />
    <transition name="fade">
      <main class="home-content">
        <product-card
          v-for="(product, index) in allProducts"
          :key="index"
          :product="product"
          @add-to-cart="addToCart"
        />
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

export default defineComponent({
  name: 'HomeView',
  components: { ProductCard, NavBar, CartManager },
  setup() {
    const userCredits = ref<number>(10000)
    const isCartShown = ref(false)
    const isLoading = ref(true)
    const productCart = ref<ICart>({})
    const allProducts = ref<null | IProduct[]>(null)
    const http = new HttpService({
      baseUrl: 'api',
      baseHeaders: {
        mode: 'no-cors',
      },
    })

    const addToCart = (product: IProduct): void => {
      if (product.id in productCart.value) {
        productCart.value[product.id].quantity += 1
      } else {
        set(productCart.value, product.id, { product, quantity: 1 })
      }
    }

    const removeFromCart = (id: string): void => {
      Vue.delete(productCart.value, id)
    }

    const emptyCart = (): void => {
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
        .catch((error: unknown) => {
          isLoading.value = false
          console.log(error)
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
      productCart,
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
  padding: 2rem 4rem;
  &-content {
    display: grid;
    padding-top: 8rem;
    gap: 3rem 3rem;
    grid-template-columns: repeat(4, minmax(0, 1fr));

    &__cart {
      position: sticky;
      top: 0;
      right: 0;
      bottom: 0;
      display: none;
      width: 35%;
      overflow-y: scroll;
      &.-open {
        position: fixed;
        z-index: 3;
        display: block;
      }
    }

    /* padding: 2rem;
        grid-template-columns: 1fr; */
    /* grid-template-columns: repeat(2, minmax(0, 1fr)); */
  }
}
</style>
