<template>
  <v-card
    elevation="5"
    class="ma-5 pt-2"
  >
    <template v-if="orders.length > 0">
      <product-row :orders="orders"/>
    </template>
    <div v-else class="empty">سبد خرید شما خالی است.</div>

  </v-card>
</template>

<script>
import ProductRow from "~/components/cart/ProductRow";

export default {
  name: 'CartPage',
  components: {ProductRow},
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
  height: 70vh;

}
</style>
