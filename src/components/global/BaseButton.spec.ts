import { shallowMount, Wrapper } from '@vue/test-utils'

import Button from './BaseButton.vue'

function mountComponent(slots = {}): Wrapper<Vue> {
  return shallowMount(Button, {
    slots,
  })
}
describe('Button', () => {
  it(' emits click event ', () => {
    const wrapper = mountComponent({ default: 'button' })
    wrapper.find('button').trigger('click')
    expect(wrapper.emitted('click')).toBeDefined()
  })
})
