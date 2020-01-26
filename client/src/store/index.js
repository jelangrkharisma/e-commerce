import Vue from 'vue'
import Vuex from 'vuex'
import axiosInstance from '../axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    // SIGNIN SIGNUP
    loggedOn: {
      _id: '',
      name: '',
      email: '',
      cart: []
    },
    userForm: 'signin'
  },
  mutations: {
    changeUserForm (state, payload) {
      state.userForm = payload
    },
    assignLoggedOnInfo (state, payload) {
      state.loggedOn._id = payload._id
      state.loggedOn.name = payload.name
      state.loggedOn.email = payload.email
      state.loggedOn.cart = payload.cart
    },
    assignCatalogs (state, catalogs) {
      state.products = catalogs.products
    },
    logout (state) {
      state.loggedOn = {
        _id: '',
        name: '',
        email: '',
        cart: []
      }
    }
  },
  actions: {
    checkout (context) {
      console.log('checkingout')
      return axiosInstance({
        method: 'post',
        url: '/checkout',
        headers: {
          'access_token': localStorage.getItem('access_token')
        }
      })
    },
    submitSignin (context, payload) {
      return axiosInstance({
        method: 'POST',
        url: '/signin',
        headers: {},
        data: {
          email: payload.email,
          password: payload.password
        }
      })
    },
    submitSignup (context, payload) {
      axiosInstance({
        method: 'POST',
        url: '/signup',
        headers: {},
        data: {
          email: payload.email,
          password: payload.password,
          name: payload.name
        }
      })
    },
    verifyToken (context, accessToken) {
      return axiosInstance({
        method: 'POST',
        url: '/verifyToken',
        headers: {
          'access_token': accessToken
        },
        data: {}
      })
    },

    // PRODUCTS RELATED
    fetchCatalogue (context) {
      axiosInstance({
        method: 'get',
        url: '/products',
        headers: {},
        data: {}
      })
        .then(({ data }) => {
          context.commit('assignCatalogs', data)
        })
    },
    fetchUserData (context) {
      console.log('refetching user info')
      axiosInstance({
        method: 'get',
        url: '/fetchuserinfo',
        headers: {
          'access_token': localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          console.log(data, 'ini di store index fetchuserdata')
          context.commit('assignLoggedOnInfo', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    addToCart (context, payload) {
      axiosInstance({
        method: 'post',
        url: '/carts',
        headers: {
          'access_token': localStorage.getItem('access_token')
        },
        data: {
          productId: payload
        }
      })
        .then(({ data }) => {
          console.log(data, 'data setelah add')
          context.commit('assignLoggedOnInfo', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    addToCartPromise (context, payload) {
      return new Promise((resolve, reject) => {
        axiosInstance({
          method: 'post',
          url: '/carts',
          headers: {
            'access_token': localStorage.getItem('access_token')
          },
          data: {
            productId: payload
          }
        })
          .then(({ data }) => {
            context.commit('assignLoggedOnInfo', data)
            resolve()
          })
          .catch(err => {
            reject(err)
            throw err
          })
      })
    },

    minusFromCart (context, payload) {
      axiosInstance({
        method: 'delete',
        url: '/carts',
        headers: {
          'access_token': localStorage.getItem('access_token')
        },
        data: {
          productId: payload
        }
      })
        .then(({ data }) => {
          console.log(data, 'data setelah minus')
          context.commit('assignLoggedOnInfo', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    minusFromCartPromise (context, payload) {
      return new Promise((resolve, reject) => {
        axiosInstance({
          method: 'delete',
          url: '/carts',
          headers: {
            'access_token': localStorage.getItem('access_token')
          },
          data: {
            productId: payload
          }
        })
          .then(({ data }) => {
            context.commit('assignLoggedOnInfo', data)
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    },

    banishFromCartPromise (context, payload) {
      return new Promise((resolve, reject) => {
        axiosInstance({
          method: 'delete',
          url: '/allcarts',
          headers: {
            'access_token': localStorage.getItem('access_token')
          },
          data: {
            productId: payload
          }
        })
          .then(({ data }) => {
            context.commit('assignLoggedOnInfo', data)
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  },
  modules: {

  }
})
