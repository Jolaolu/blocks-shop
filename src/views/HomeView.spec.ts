import { shallowMount, Wrapper } from '@vue/test-utils'
import HttpService from '~/services'
import { blocks } from '~/helpers/mock'
import Home from './HomeView.vue'

jest.mock('~/services')

const mockHttpService = jest.fn().mockResolvedValue(blocks)
jest.mock('~/services', () => {
  return jest.fn().mockImplementation(() => {
    return { get: mockHttpService }
  })
})

function mountComponent(): Wrapper<Vue> {
  return shallowMount(Home, {
    stubs: {
      Transition: true,
    },
    mocks: { $toast: jest.fn() },
  })
}

describe('Home', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockHttpService.mockClear()
  })

  it('renders loader ', () => {
    const wrapper = mountComponent()
    expect(wrapper.get('base-loader-stub').exists()).toBeTruthy()
  })
  it('renders product card', async () => {
    const wrapper = mountComponent()
    await wrapper.vm.$nextTick()
    const httpSpy = new HttpService({ baseUrl: '' })
    expect(httpSpy.get).toHaveBeenCalled()
    await wrapper.vm.$nextTick()
    expect(wrapper.get('product-card-stub').exists()).toBeTruthy()
  })

  it('renders cart on navbar icon click', async () => {
    const wrapper = mountComponent()
    wrapper.get('nav-bar-stub').vm.$emit('show-cart')
    await wrapper.vm.$nextTick()
    expect(wrapper.get('cart-manager-stub').exists()).toBeTruthy()
  })
})
