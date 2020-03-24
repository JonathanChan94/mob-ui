import Toast from './src/toast.vue'

Toast.install = (Vue) => {
  const ToastConstructor = Vue.extend(Toast)

  const main = ({ message, duration }) => {
    const instance = new ToastConstructor({
      data: {
        message,
        duration: duration || 2000
      }
    })

    instance.$mount()
    document.body.appendChild(instance.$el)

    instance.$on('close', () => {
      document.body.removeChild(instance.$el)
      instance.$destroy()
    })
  }

  Vue.prototype.$toast = main
}

export default Toast
