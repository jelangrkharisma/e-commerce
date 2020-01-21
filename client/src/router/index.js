import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
  },
  {
    path: '/shoppingcart',
    name: 'shoppingCart',
    component: () => import(/* webpackChunkName: "shoppingCart" */ '../views/ShoppingCart.vue')
  },
  {
    path: '/detail',
    name: 'productDetail',
    component: () => import(/* webpackChunkName: "productDetail" */ '../views/ProductDetail.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
