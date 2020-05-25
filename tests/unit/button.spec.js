import { shallowMount } from '@vue/test-utils'
import Button from '../../packages/button/src/button.vue'

describe('测试button组件', () => {
  it('1: 可以渲染出button组件', () => {
    const wrapper = shallowMount(Button)
    expect(wrapper.contains('.api-button')).toBe(true)
  })
})
