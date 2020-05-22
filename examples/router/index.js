import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/form',
    name: 'Form',
    component: () => import(/* webpackChunkName: "about" */ '../views/Form.vue')
  },
  {
    path: '/calendar',
    name: 'Calendar',
    component: () => import('../views/Calendar.vue')
  },
  {
    path: '/scroll',
    name: 'Scroll',
    component: () => import('../views/Scroll.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
