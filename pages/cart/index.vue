<template>
  <cart-stepper/>
</template>

<script>
import OrdersSheet from "~/components/cart/order/OrdersSheet";
import LocationSheet from "~/components/cart/location/LocationSheet";
import CartStepper from "~/components/cart/CartStepper";

export default {
  name: 'CartPage',
  components: {CartStepper, LocationSheet, OrdersSheet},
  created() {
    if (process.client) {
      this.$store.dispatch("initOrders")
    }
  },

}
</script>


