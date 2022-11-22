<template>
  <div>
    <v-card
      elevation="5"
      class="ma-5 pt-5 pb-8"
      height="80vh"
    >
      <div v-if="orders.length > 0" class="order-container">
        <div v-for="item in orders" :key="item.id">
          <order-card :order="item"/>
        </div>
      </div>

      <div v-else class="empty">
        <h1 class="my-3">تاکنون سفارشی ثبت نشده است</h1>
      </div>
    </v-card>
  </div>
</template>

<script>
import OrderCard from "~/components/orders/OrderCard";
export default {
  components: {OrderCard},
  data() {
    return{
      orders : []
    }
  },
  created() {
    if (process.client) {
      this.$store.dispatch("initFinalOrders")
      this.orders = this.$store.getters.finalOrders
    }
  },
  computed: {
    orders() {
      return this.$store.getters.finalOrders
    }
  }
}
</script>

<style scoped>
.order-container{
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}
.empty {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
</style>
