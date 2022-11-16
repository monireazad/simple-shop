import Vuex from 'vuex'
// import data from '@/api/data.json'

let ordersList = []
let data = []

export default () => {
  return new Vuex.Store({
    state: {
      listOfProduct: [],
      orders: [],
    },

    mutations: {
      setProducts(state, products) {
        state.listOfProduct = products
      },

      setOrders(state, order) {
        state.orders.push(order)
      },

      initOrders(state, orders) {
        state.orders = [...orders]
      },

      removeOrders(state, orders) {
        state.orders = orders
      },
    },

    actions: {
      setProducts({commit}, product) {
        const index = data.findIndex(
          (item) => item.id == product.id
        )
        if (index > -1) {
          data[index] = product
        } else {
          data.push(product)
        }
        localStorage.setItem('_products', JSON.stringify(data))
        commit('setProducts', data)
      },

      initProducts({commit}) {
        const products = JSON.parse(localStorage.getItem('_products'))
        if (products) {
          data = [...products]
          commit('setProducts', products)
        }
      },

      removeProducts({commit}, removeItem) {
        const products = JSON.parse(localStorage.getItem('_products'))
        if (products){
          const index = products.findIndex(
            (item) => item.id == removeItem.id
          )
          products.splice(index, 1)
          commit('setProducts', products)
          localStorage.setItem('_products', JSON.stringify(products))
        }
      },

      setOrders({commit}, product) {
        const index = ordersList.findIndex(
          (item) => item.id == product.id
        )
        if (index > -1) {
          ordersList[index] = product
        } else {
          commit('setOrders', product)
          ordersList.push(product)
        }
        localStorage.setItem('_orders', JSON.stringify(ordersList))

      },

      initOrders({commit}) {
        const orders = JSON.parse(localStorage.getItem('_orders'))
        if (orders) {
          ordersList = [...orders]
          commit('initOrders', orders)
        }
      },

      removeOrders({commit}, removeItem) {
        const index = ordersList.findIndex(
          (item) => item.id === removeItem.id
        )
        ordersList.splice(index, 1)
        console.log(ordersList)
        commit('removeOrders', ordersList)
        localStorage.setItem('_orders', JSON.stringify(ordersList))
      },
    },
    getters: {
      listOfProduct(state) {
        return state.listOfProduct
      },

      orders(state) {
        return state.orders
      }
    },
  })
}
