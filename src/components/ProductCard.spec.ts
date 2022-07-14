import { shallowMount, Wrapper } from '@vue/test-utils'
import { getNoun } from '~/helpers'
import { blocks } from '~/helpers/mock'
import ProductCard from './ProductCard.vue'

function mountComponent(propsData = {}): Wrapper<Vue> {
  return shallowMount(ProductCard, {
    propsData,
  })
}
const product = blocks.data[0]
describe('ProductCard', () => {
  let wrapper: Wrapper<Vue>
  beforeEach(() => {
    wrapper = mountComponent({ product })
  })

  it('renders correct data', () => {
    expect(wrapper.get('.card-img img').attributes().src).toBe(product.metadata.blockThumbnailUrl)
    expect(wrapper.get('.card-info__description').text()).toBe(product.description)
    expect(wrapper.get('.card-info__price').text().replace(/\s/g, '')).toContain(
      product.metadata.blockPricingStrategy.credits + getNoun(product.metadata.blockPricingStrategy.credits, 'credit')
    )
  })

  it('emits "add to cart event"', async () => {
    wrapper.get('base-button-stub').vm.$emit('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted()['add-to-cart']![0][0]).toMatchObject(product)
  })
})
