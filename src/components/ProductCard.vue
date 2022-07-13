<template>
  <article class="card" tabindex="0">
    <div class="card-img">
      <img :src="product.metadata.blockThumbnailUrl" :alt="product.displayName" />
    </div>
    <div class="card-info">
      <h2 class="card-info__title">{{ product.displayName }}</h2>
      <p class="card-info__price">
        {{ product.metadata.blockPricingStrategy.credits }}
        {{ getNoun(product.metadata.blockPricingStrategy.credits, 'credit') }}
      </p>
      <p class="card-info__description">{{ product.description }}</p>
      <base-button class="card-info__btn" @click="$emit('add-to-cart', product)"> Add to cart </base-button>
    </div>
  </article>
</template>
<script lang="ts">
import { PropType, defineComponent } from 'vue'
import { IProduct } from '~/services/interfaces'
import { getNoun } from '~/helpers/index'
import BaseButton from './global/BaseButton.vue'
export default defineComponent({
  components: {
    BaseButton,
  },
  props: {
    product: {
      type: Object as PropType<IProduct>,
      required: true,
    },
  },
  setup() {
    return {
      getNoun,
    }
  },
})
</script>
<style lang="scss">
.card {
  display: flex;
  height: 100%;
  max-height: 35rem;
  flex-direction: column;
  justify-content: space-between;
  text-align: left;
  &:hover {
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.306764);
    transform: translateY(-6px);
    img {
      transform: scale(1.04);
    }
  }
  &-img {
    img {
      width: 100%;
      height: 19rem;
      border-radius: 0.6rem;
      object-fit: cover;
      transition: all 0.5s ease-in-out;
    }
  }
  &-info {
    &__title {
      margin-bottom: 0.6rem;
      font-size: 1.4rem;
      font-weight: 600;
    }
    &__price {
      margin-bottom: 0.6rem;
      font-size: 1.8rem;
      font-weight: 700;
    }
    &__description {
      overflow: hidden;
      /* word-break: break-all; */
      max-height: 3.1rem;
      margin-bottom: 0.8rem;
      font-size: 1.2rem;
      font-weight: 400;
      text-overflow: ellipsis;
    }
    &__btn {
      @include button;
      width: 100%;
      padding: 1rem;
    }
  }
}
</style>
