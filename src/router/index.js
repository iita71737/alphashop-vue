import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFound from '../views/NotFound.vue'
import AlphaShop from '../views/AlphaShop.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'root',
    component: AlphaShop
  },
  {
    path: '/step1',
    name: 'step1',
    component: () => import('../views/AlphaShop.vue')
  },
  {
    path: '/step2',
    name: 'step2',
    component: () => import('../views/AlphaShop.vue')
  },
  {
    path: '/step3',
    name: 'step3',
    component: () => import('../views/AlphaShop.vue')
  },
  {
    path: '*',
    name: 'not-found',
    component: NotFound
  }
]

const router = new VueRouter({
  routes
})

export default router
