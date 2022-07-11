import { shallowMount, Wrapper } from '@vue/test-utils'
import App from './App.vue'

function mountComponent(): Wrapper<Vue> {
  return shallowMount(App, {
    mocks: {
      $router: { afterEach: jest.fn() },
    },
    stubs: {
      RouterView: true,
    },
  })
}

describe('App', () => {
  it('renders router-view', () => {
    const wrapper = mountComponent()
    expect(wrapper.get('routerview-stub').exists()).toBeTruthy()
  })
})
