import Loading from '../../packages/loading/index'
import { sleep } from '../util'

describe('loading func', () => {
  afterEach(() => {
    const el = document.querySelector('.loading-wrapper')
    if (!el) return
    if (el.parentNode) {
      el.parentNode.removeChild(el)
    }
    if (el.__vue__) {
      el.__vue__.$destroy()
    }
  })

  it('1: auto close', async () => {
    Loading.open({
      autoClose: true,
      duration: 500
    })
    expect(document.querySelector('.loading-wrapper') !== null).toBe(true)
    await sleep(600)
    expect(document.querySelector('.loading-wrapper') === null).toBe(true)
  })

  it('2: manual close', () => {
    Loading.open()
    expect(document.querySelector('.loading-wrapper') !== null).toBe(true)
    Loading.close()
    expect(document.querySelector('.loading-wrapper') === null).toBe(true)
  })
})
