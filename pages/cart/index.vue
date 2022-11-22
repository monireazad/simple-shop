<template>
  <v-card
    elevation="5"
    class="ma-5 pt-2 pb-8"
    height="80vh"
  >
    <div class="order-container" v-if="this.$route.fullPath == '/cart'">
      <template v-if="orders.length > 0" >
        <orders-sheet :orders="orders"/>
      </template>
      <h1 v-else class="empty">سبد خرید شما خالی است.</h1>
    </div>
    <div v-else-if="this.$route.fullPath == '/cart#location'">
          <location-sheet/>
    </div>

  </v-card>
</template>

<script>
import OrdersSheet from "~/components/cart/OrdersSheet";
import LocationSheet from "~/components/cart/location/LocationSheet";

export default {
  name: 'CartPage',
  components: {LocationSheet, OrdersSheet},
  computed: {
    orders() {
      return this.$store.getters.orders
    }
  },
  created() {
    if (process.client) {
      this.$store.dispatch("initOrders")
    }
  },

}
</script>

<style lang="scss" scoped>
.empty {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
.order-container{
  width: 100%;
  height: 100%;
  overflow: auto;
}
</style>
