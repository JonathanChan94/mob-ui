import Vue from 'vue'
import ToastVue from './toast.vue'

const ToastConstructor = Vue.extend(ToastVue)

const Toast = ({ message = '', duration = 2000 }) => {
  const instance = new ToastConstructor({
    data: {
      message,
      duration
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
