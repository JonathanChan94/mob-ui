import Vue from 'vue'
import LoadingVue from './loading.vue'

const LoadingConstructor = Vue.extend(LoadingVue)
let instance = null

const Loading = {
  open ({ autoClose = false, duration = 3000 } = {}) {
    instance = new LoadingConstructor({
      data: {
        autoClose,
        duration
      }
    })
    instance.$mount()
    document.body.appendChild(instance.$el)
    instance.$on('close', () => {
      this.close()
    })
  },
  close () {
    instance.$destroy()
    document.body.removeChild(instance.$el)
    instance = null
  }
}

export default Loading
