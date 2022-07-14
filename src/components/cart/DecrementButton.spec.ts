import { shallowMount, Wrapper } from '@vue/test-utils'

import DecrementButton from './DecrementButton.vue'

function mountComponent(): Wrapper<Vue> {
  return shallowMount(DecrementButton, {})
}
describe('DecrementButton', () => {
  it(' emits click event ', () => {
    const wrapper = mountComponent()
    wrapper.find('button').trigger('click')
    expect(wrapper.emitted('click')).toBeDefined()
  })
})
