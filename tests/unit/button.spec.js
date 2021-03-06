import { shallowMount } from '@vue/test-utils'
import Button from '../../packages/button/src/button.vue'

describe('button.vue', () => {
  let wrapper
  afterEach(() => {
    wrapper.vm.$destroy()
    wrapper.destroy()
  })

  it('1: button render', () => {
    wrapper = shallowMount(Button)
    expect(wrapper.contains('button.dark')).toBe(true)
  })

  it('2: button loading', async () => {
    wrapper = shallowMount(Button)

    wrapper.setProps({
      loading: true
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.contains('button.is-loading')).toBe(true)
    expect(wrapper.contains('span.loading')).toBe(true)

    wrapper.setProps({
      loading: false
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.contains('button.is-loading')).toBe(false)
    expect(wrapper.contains('span.loading')).toBe(false)
  })

  it('3: button slot', () => {
    wrapper = shallowMount(Button, {
      slots: {
        default: 'click me'
      }
    })
    expect(wrapper.text()).toBe('click me')
  })

  it('4: button click', () => {
    const fn = jest.fn()
    wrapper = shallowMount(Button)
    wrapper.vm.$on('click', fn)

    wrapper.find('button').trigger('click')
    expect(fn).toBeCalled()
    expect(fn).toBeCalledTimes(1)

    wrapper.find('button').trigger('click')
    expect(fn).toBeCalledTimes(2)
  })
})
