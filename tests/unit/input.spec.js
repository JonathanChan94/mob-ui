import { shallowMount } from '@vue/test-utils'
import Input from '../../packages/input/src/input.vue'

describe('input.vue', () => {
  it('1: input render', () => {
    const wrapper = shallowMount(Input)
    expect(wrapper.contains('.api-input-wrapper')).toBe(true)
    expect(wrapper.contains('input')).toBe(true)
  })

  it('2: input value', async () => {
    const wrapper = shallowMount(Input, {
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
    const wrapper = shallowMount(Input, {
      propsData: {
        type: 'textarea'
      }
    })
    expect(wrapper.contains('input[type="textarea"]')).toBe(true)
  })

  it('4: input event', () => {
    let value = '1'
    const func = (val) => {
      value = val
    }
    const wrapper = shallowMount(Input, {
      propsData: {
        value
      }
    })
    const inputEle = wrapper.find('input')
    wrapper.vm.$on('input', func)
    wrapper.vm.$on('change', func)

    expect(value).toBe('1')

    const dispatch = (text, event) => {
      inputEle.element.value = text
      inputEle.element.dispatchEvent(new Event(event))
    }

    dispatch('2', 'input')
    expect(value).toBe('2')

    dispatch('3', 'change')
    expect(value).toBe('3')
  })
})
