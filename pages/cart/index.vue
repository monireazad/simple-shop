<template>
  <v-card
    elevation="5"
    class="ma-5 pt-2 pb-8"
    height="80vh"
  >
    <div class="order-container" v-if="orders.length > 0" >
      <order-row :orders="orders"/>
      <cart-action-btn/>
    </div>
    <div v-else class="empty">سبد خرید شما خالی است.</div>

  </v-card>
</template>

<script>
import CartActionBtn from "~/components/cart/CartActionBtn";
import OrderRow from "~/components/cart/OrderRow";

export default {
  name: 'CartPage',
  components: {OrderRow, CartActionBtn},
  data() {
    return {
      isOrder: false,
    }
  },
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
.v-card{
  overflow: hidden;
}
.order-container{
  width: 100%;
  height: 100%;
  overflow: auto;
}
</style>
