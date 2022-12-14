import Vuex from 'vuex'

export default () => {
  return new Vuex.Store({
    state: {
      products: [],
      categories: [],
      orders: [],
      location: {},
      finalOrders: [],
      adminProducts: [],
    },

    mutations: {
      getProducts(state , {data}){
        state.products = data
      },

      getAdminProducts(state , {data}){
        state.adminProducts = data
      },

      getCategories(state , data) {
        state.categories = data
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
    },

    actions: {
      async nuxtServerInit({ commit , state}){
        const products = await this.$axios.$get('/products')
        commit('getProducts' , products.entity)
        if (state.auth.loggedIn) {
          const {data} = await this.$axios.get('/shop/categories')
          commit('getCategories', data.entity)

          const response = await this.$axios.get('/shop/products')
          commit('getAdminProducts', response)
        }
      },


      async removeProduct({commit , state}, removeItem) {
        const response = await this.$axios.$delete(`shop/products/${removeItem.id}`)
      },

      async initCategory({commit}) {
        const {data} = await this.$axios.get('/shop/categories')
        commit('getCategories', data.entity)
      },

      //--------------
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

      async initOrders({commit}) {
         const orders = await JSON.parse(localStorage.getItem('_orders'))
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

    },

    getters: {
      isAuthenticated(state) {
        return state.auth.loggedIn
      },
      loggedInUser(state) {
        return state.auth.user
      }
    },
  })
}
