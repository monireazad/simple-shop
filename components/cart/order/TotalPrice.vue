<template>
  <v-row>
    <v-col cols="4">
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>مجموع قیمت محصولات:</v-list-item-title>
          <v-list-item-subtitle>{{ totalPrice.toLocaleString() }} تومان</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-col>
    <v-col cols="4">
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>تخفیف:</v-list-item-title>
          <v-list-item-subtitle>{{ offer }} تومان</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-col>
    <v-col cols="4">
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>مبلغ نهایی:</v-list-item-title>
          <v-list-item-subtitle>{{ finalPrice.toLocaleString() }} تومان</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "TotalPrice",
  data() {
    return {
      offer: 0,
    }
  },
  props: {
    orders: {
      type: Array,
      require: true
    }
  },
  computed: {
    totalPrice() {
      let total = 0
      for (const ordersKey in this.orders) {
        total += (this.orders[ordersKey].price * this.orders[ordersKey].orderNum)
      }
      return total
    },
    finalPrice() {
      return this.totalPrice - this.offer
    }
  },
}
</script>

<style scoped>

</style>
