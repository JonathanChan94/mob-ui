import Vue from 'vue'
import App from './App.vue'
import router from './router'
import MobButton from '../packages/button/index.js'

Vue.use(MobButton)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
