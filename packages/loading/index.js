import Loading from './src/loading.vue'

Loading.install = (Vue) => {
  const LoadingConstructor = Vue.extend(Loading)
  const instance = new LoadingConstructor()
  instance.$mount()
  document.body.appendChild(instance.$el)

  const main = {
    open ({ autoClose = false, duration = 3000 } = {}) {
      instance.show = true
      if (autoClose) {
        instance.autoClose = autoClose
        instance.duration = duration
        instance.countDown()
      }
    },
    close () {
      instance.show = false
    }
  }

  Vue.prototype.$loading = main
}

export default Loading
