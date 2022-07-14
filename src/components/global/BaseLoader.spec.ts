import { shallowMount, Wrapper } from '@vue/test-utils'
import BaseLoader from './BaseLoader.vue'

function mountComponent(): Wrapper<Vue> {
  return shallowMount(BaseLoader)
}
describe('NavBar', () => {
  let wrapper: Wrapper<Vue>
  beforeEach(() => {
    wrapper = mountComponent()
  })
  it('emits click event ', () => {
    expect(wrapper.find('.loader').exists()).toBeTruthy()
  })
})
