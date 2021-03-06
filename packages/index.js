import MobButton from './button/index.js'
import MobInput from './input/index.js'
import MobFormItem from './form-item/index.js'
import MobForm from './form/index.js'
import MobScroll from './scroll/index.js'
import MobCalendar from './calendar/index.js'
import Loading from './loading/index.js'
import Toast from './toast/index.js'

const components = [
  MobButton,
  MobInput,
  MobFormItem,
  MobForm,
  MobScroll,
  MobCalendar
]

const install = function (Vue) {
  if (install.installed) return
  // 组件注册
  components.map(component => Vue.use(component))

  // 挂载到prototype
  Vue.prototype.$toast = Toast
  Vue.prototype.$loading = Loading
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  MobButton,
  MobInput,
  MobFormItem,
  MobForm,
  MobScroll,
  MobCalendar,
  Loading,
  Toast
}
