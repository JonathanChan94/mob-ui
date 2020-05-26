import Vue from 'vue'
import App from './App.vue'
import router from './router'
import MobUI from '../packages/index'

// import './utils/vconsole'

Vue.use(MobUI)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
