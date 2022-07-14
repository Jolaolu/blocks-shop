import { shallowMount, Wrapper } from '@vue/test-utils'

import IncrementButton from './IncrementButton.vue'

function mountComponent(): Wrapper<Vue> {
  return shallowMount(IncrementButton, {})
}
describe('IncrementButton', () => {
  it(' emits click event ', () => {
    const wrapper = mountComponent()
    wrapper.find('button').trigger('click')
    expect(wrapper.emitted('click')).toBeDefined()
  })
})
