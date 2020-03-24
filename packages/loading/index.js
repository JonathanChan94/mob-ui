import Loading from './src/loading.vue'

Loading.install = (Vue) => {
  const LoadingConstructor = Vue.extend(Loading)
  const instance = new LoadingConstructor()

  const main = {
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

  Vue.prototype.$loading = main
}

export default Loading
