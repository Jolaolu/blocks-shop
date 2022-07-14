import { shallowMount, Wrapper } from '@vue/test-utils'
import { getNoun, convertToLocaleSring } from '~/helpers'
import { cart, creditBalance } from '~/helpers/mock'
import CartManager from './CartManager.vue'

function mountComponent(propsData = {}): Wrapper<Vue> {
  return shallowMount(CartManager, {
    propsData,
  })
}

const firstId = Object.keys(cart)[0]
const secondId = Object.keys(cart)[1]
const firstCredit = cart[firstId].product.metadata.blockPricingStrategy.credits
const secondCredit = cart[secondId].product.metadata.blockPricingStrategy.credits
describe('CartManager', () => {
  let wrapper: Wrapper<Vue>
  beforeEach(() => {
    wrapper = mountComponent({ creditBalance, cart })
  })
  it('renders empty state ', () => {
    const wrapper = mountComponent({ creditBalance, cart: {} })
    expect(wrapper.get('.cart-details').classes()).toContain('-empty')
  })
  it('emits increment event', async () => {
    wrapper.find('increment-button-stub').vm.$emit('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted()['increment-item']![0][0]).toBe(firstId)
  })
  it('emits decrement event', async () => {
    wrapper.find('decrement-button-stub').vm.$emit('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted()['decrement-item']![0][0]).toBe(firstId)
  })
  it('emits item to be removed from cart', async () => {
    wrapper.find('.item-remove').trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted()['remove-item']![0][0]).toBe(firstId)
  })
  it('renders correct data', () => {
    const total = Number(cart[secondId].quantity) * secondCredit + Number(cart[firstId].quantity) * firstCredit
    expect(wrapper.get('.item-price').text().replace(/\s/g, '')).toContain(firstCredit + getNoun(firstCredit, 'credit'))
    expect(wrapper.get('.item-total span').text().replace(/\s/g, '')).toContain(convertToLocaleSring(total))
  })
})
