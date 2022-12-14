<template>
  <div>
    <order-row :orders="orders"/>
  </div>
</template>

<script>
import OrderRow from "~/components/cart/order/OrderRow";
import orders from "~/pages/admin/orders";

export default {
  name: "OrdersSheet",
  components: {OrderRow},
  props: {
    orders: {
      type: Array,
      require: true
    }
  },
}
</script>
