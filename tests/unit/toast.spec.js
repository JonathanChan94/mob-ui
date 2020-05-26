import Toast from '../../packages/toast/index'
import { sleep } from '../util'

describe('Toast', () => {
  afterEach(() => {
    const el = document.querySelector('.toast')
    if (!el) return
    if (el.parentNode) {
      el.parentNode.removeChild(el)
    }
    if (el.__vue__) {
      el.__vue__.$destroy()
    }
  })

  it('1: auto close', async () => {
    Toast({
      message: 'test',
      duration: 500
    })
    expect(document.querySelector('.toast') !== null).toBe(true)
    await sleep(600)
    expect(document.querySelector('.toast') === null).toBe(true)
  })

  it('2: message', () => {
    Toast({
      message: 'test',
      duration: 500
    })
    expect(document.querySelector('.toast-wrapper p').innerHTML).toBe('test')
  })
})
