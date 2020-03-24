import Vue from 'vue'
import LoadingVue from './loading.vue'

const LoadingConstructor = Vue.extend(LoadingVue)
const instance = new LoadingConstructor()

const Loading = {
  open ({ autoClose = false, duration = 3000 } = {}) {
    instance.$mount()
    document.body.appendChild(instance.$el)
    instance.show = true
    if (autoClose) {
      instance.autoClose = autoClose
      instance.duration = duration
      instance.countDown()
    }
  },
  close () {
    instance.show = false
    document.body.removeChild(instance.$el)
    instance.$destroy()
  }
}

export default Loading
