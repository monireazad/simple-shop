import Vuex from 'vuex'
import users from '@/api/users.json'

export default () => {
  return new Vuex.Store({
    state: {
      listOfProduct: [],
      orders: [],
      location: {},
      finalOrders: [],
      token: null,
    },

    mutations: {
      setProducts(state, products) {
        state.listOfProduct = products
      },

      setOrders(state, orders) {
        state.orders = orders
      },

      setLocation(state, location) {
        state.location = location
      },

      setFinalOrders(state, order) {
        state.finalOrders.push(order)
      },

      initFinalOrders(state, orders) {
        state.finalOrders = orders
      },

      login(state, token) {
        state.token = token
      },

      logout(state) {
        state.token = null
      }
    },

    actions: {
      setProducts({commit, state}, product ) {
        let productList = state.listOfProduct
        const index = productList.findIndex(
          (item) => item.id == product.id
        )
        if (index > -1) {
          productList[index] = product
        } else {
          productList.push(product)
        }
        localStorage.setItem('_products', JSON.stringify(productList))
        commit('setProducts', productList)
      },

      initProducts({commit}) {
        const products = JSON.parse(localStorage.getItem('_products'))
        if (products) {
          commit('setProducts', products)
        }
      },

      removeProducts({commit}, removeItem) {
        const products = JSON.parse(localStorage.getItem('_products'))
        if (products) {
          const index = products.findIndex(
            (item) => item.id == removeItem.id
          )
          products.splice(index, 1)
          commit('setProducts', products)
          localStorage.setItem('_products', JSON.stringify(products))
        }
      },

      setOrders({commit, state}, product) {
        let orderList = state.orders
        const index = orderList.findIndex(
          (item) => item.id == product.id
        )
        if (index > -1) {
          orderList[index] = product
        } else {
          orderList.push(product)
        }
        localStorage.setItem('_orders', JSON.stringify(orderList))
        commit('setOrders', orderList)
      },

      initOrders({commit}) {
        const orders = JSON.parse(localStorage.getItem('_orders'))
        if (orders) {
          commit('setOrders', orders)
        }
      },

      removeOrders({commit}, removeItem) {
        const orders = JSON.parse(localStorage.getItem('_orders'))
        if (orders) {
          const index = orders.findIndex(
            (item) => item.id === removeItem.id
          )
          orders.splice(index, 1)
          commit('setOrders', orders)
          localStorage.setItem('_orders', JSON.stringify(orders))
        }
      },

      setLocation({commit}, location) {
        commit('setLocation', location)
        localStorage.setItem('_location', JSON.stringify(location))
      },

      initLocation({commit}) {
        const location = JSON.parse(localStorage.getItem('_location'))
        if (location) {
          commit('setLocation', location)
        }
      },

      setFinalOrders({commit, state}) {
        const orders = JSON.parse(localStorage.getItem('_orders'))
        const location = JSON.parse(localStorage.getItem('_location'))

        const order = {
          orders: orders,
          userInfo: location,
        }
        commit('setFinalOrders', order)
        localStorage.removeItem('_orders')
        localStorage.setItem('_finalOrders', JSON.stringify(state.finalOrders))
      },

      initFinalOrders({commit}) {
        const orders = JSON.parse(localStorage.getItem('_finalOrders'))
        if (orders) {
          commit('initFinalOrders', orders)
        }
      },

      login({commit}, credentials) {
        const user = users[0]
        const username = user.username
        const password = user.password
        if (credentials.username === username && credentials.password === password) {
          commit('login', user.token)
          localStorage.setItem('_token', user.token)
          this.$cookies.set('jwt', user.token)
        }
      },

      initAuth({commit}, request) {
        let token
        if (request) {
          if (request.headers.cookie) {
            const jwt = request.headers.cookie.split(';').find(c => c.trim().startsWith('jwt='))
            if (jwt) {
              token = jwt.split('=')[1]
            }
          }
        } else {
          token = localStorage.getItem('_token')
        }
        if (token) {
          commit('login', token)
        }
      },

      logout({commit}) {
        localStorage.removeItem('_token')
        this.$cookies.remove('jwt')
        commit("logout")
      },
    },

    getters: {
      isAuthenticated(state) {
        return Boolean(state.token)
      }
    },
  })
}
