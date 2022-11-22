<template>
  <div class="order-container">
    <div class="order-container">
      <div class="total-price pa-8">
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

      </div>
      <div class="orders-list">
        <order-row :orders="orders"/>
      </div>
    </div>
    <v-btn
      class="ma-3"
      color="primary"
      small
      dark
      absolute
      bottom
      left
      @click="nextStep()"
    >
      ادامه فرایند خرید
    </v-btn>
  </div>
</template>

<script>
import OrderRow from "~/components/cart/OrderRow";
import orders from "~/pages/orders";

export default {
  name: "OrdersSheet",
  components: {OrderRow},
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
  methods:{
    nextStep(){
      this.$router.push("/cart#location")
    },
  },
}
</script>

<style lang="scss" scoped>
.order-container {
  width: 100%;
  height: 100%;
  overflow: auto;
  position: relative;

  .total-price {
    background-color: white;
    width: 75%;
    z-index: 100;
    position: fixed;
  }

  .orders-list {
    position: absolute;
    top: 100px;
  }
}


</style>
