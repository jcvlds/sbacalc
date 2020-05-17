import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Signup from '../views/Signup.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/calc',
    name: 'Calc',
    component: Home
  },
  {
    path: '/',
    name: 'Signup',
    component: Signup
    // component: () => import('@/views/Signup.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
    // component: () => import('@/views/Login.vue')
  }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
