import { shallowMount, Wrapper } from '@vue/test-utils'
import App from './App.vue'

function mountComponent(): Wrapper<Vue> {
  return shallowMount(App, {})
}

describe('App', () => {
  it('renders router-view', () => {
    const wrapper = mountComponent()
    expect(wrapper.get('home-view-stub').exists()).toBeTruthy()
  })
})
