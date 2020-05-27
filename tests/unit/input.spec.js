import { shallowMount } from '@vue/test-utils'
import Input from '../../packages/input/src/input.vue'

describe('input.vue', () => {
  let wrapper
  afterEach(() => {
    wrapper.vm.$destroy()
    wrapper.destroy()
  })

  it('1: input render', () => {
    wrapper = shallowMount(Input)
    expect(wrapper.contains('.api-input-wrapper')).toBe(true)
    expect(wrapper.contains('input')).toBe(true)
  })

  it('2: input value', async () => {
    wrapper = shallowMount(Input, {
      propsData: {
        value: 'test'
      }
    })
    const inputEle = wrapper.find('input')
    expect(inputEle.element.value).toBe('test')

    wrapper.setProps({
      value: 'hello'
    })
    await wrapper.vm.$nextTick()
    expect(inputEle.element.value).toBe('hello')
  })

  it('3: input type', () => {
    wrapper = shallowMount(Input, {
      propsData: {
        type: 'textarea'
      }
    })
    expect(wrapper.contains('input[type="textarea"]')).toBe(true)
  })

  it('4: input event', () => {
    const func1 = jest.fn()
    const func2 = jest.fn()

    wrapper = shallowMount(Input)
    const inputEle = wrapper.find('input')
    wrapper.vm.$on('input', func1)
    wrapper.vm.$on('change', func1)
    wrapper.vm.$on('blur', func2)
    wrapper.vm.$on('focus', func2)

    const dispatch = (text, event) => {
      inputEle.element.value = text
      inputEle.element.dispatchEvent(new Event(event))
    }

    dispatch('1', 'input')
    expect(func1).toBeCalledTimes(1)
    expect(func1).toBeCalledWith('1')

    dispatch('2', 'change')
    expect(func1).toBeCalledTimes(2)
    expect(func1).toBeCalledWith('2')

    dispatch('3', 'focus')
    expect(func2).toBeCalledTimes(1)

    dispatch('4', 'blur')
    expect(func2).toBeCalledTimes(2)
  })
})
