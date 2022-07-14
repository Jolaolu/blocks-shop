import { shallowMount, Wrapper } from '@vue/test-utils'
import { convertToLocaleSring } from '~/helpers'
import { cartItemsCount, creditBalance } from '~/helpers/mock'
import NavBar from './NavBar.vue'

function mountComponent(propsData = {}): Wrapper<Vue> {
  return shallowMount(NavBar, {
    propsData,
  })
}
describe('NavBar', () => {
  let wrapper: Wrapper<Vue>
  beforeEach(() => {
    wrapper = mountComponent({ creditBalance, cartItemsCount })
  })
  it('emits click event ', () => {
    wrapper.find('.nav-cart').trigger('click')
    expect(wrapper.emitted('show-cart')).toBeDefined()
  })
  it('shows available credit', () => {
    expect(wrapper.find('.navbar-info__balance').text()).toContain(convertToLocaleSring(creditBalance))
  })
  it('shows number of cart items', () => {
    expect(wrapper.find('.nav-cart__count').text()).toBe(cartItemsCount.toString())
  })
})
