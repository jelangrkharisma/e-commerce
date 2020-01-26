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
    path: '/profile',
    component: () => import(/* webpackChunkName: "profile" */ '../views/Profile.vue'),
    children: [
      {
        path: '',
        name: 'profile',
        component: () => import(/* webpackChunkName: "profile" */ '../components/Profile.vue')
      },
      {
        path: 'addproduct',
        name: 'Admin panel - add product',
        component: () => import(/* webpackChunkName: "Admin panel" */ '../components/AddProduct.vue')
      }
    ]
  },
  {
    path: '/shoppingcart',
    name: 'shoppingCart',
    component: () => import(/* webpackChunkName: "shoppingCart" */ '../views/ShoppingCart.vue')
  },
  {
    path: '/search',
    component: () => import(/* webpackChunkName: "products" */ '../views/Search.vue'),
    name: 'search result'
  },
  {
    path: '/products',
    component: () => import(/* webpackChunkName: "products" */ '../views/Home.vue'),
    children: [
      {
        path: ':id',
        name: 'product detail',
        component: () => import(/* webpackChunkName: "productDetail" */ '../views/ProductDetail.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
