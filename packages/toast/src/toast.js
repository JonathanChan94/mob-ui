import Vue from 'vue'
import ToastVue from './toast.vue'

const ToastConstructor = Vue.extend(ToastVue)

const Toast = ({ message, duration }) => {
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

export default Toast
