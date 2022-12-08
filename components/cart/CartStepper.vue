<template>
  <v-stepper v-model="e1" class="ma-5 pt-2 pb-8" height="80vh">
    <v-stepper-header>
      <v-stepper-step
        :complete="e1 > 1"
        step="1"
      >
        سبد خرید
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step
        :complete="e1 > 2"
        step="2"
      >
        اطلاعات ارسال
      </v-stepper-step>

      <v-divider></v-divider>

    </v-stepper-header>

    <v-stepper-items class="order-container">
      <v-stepper-content step="1">
        <v-card
          class="ma-0 pa-0"
          elevation="0"
          height="70px"
        >
        <total-price :orders="orders"/>
        </v-card>
        <v-card
          class="mb-3 order-container"
          elevation="0"
          height="43vh"
        >
          <template v-if="isOrder">
            <orders-sheet :orders="orders"/>
          </template>
          <h1 v-else class="empty">سبد خرید شما خالی است.</h1>
        </v-card>

        <v-btn
          v-if="isOrder"
          class="mx-3"
          color="primary"
          @click="e1 = 2"
          absolute
          left
        >
          ادامه فرایند خرید
        </v-btn>
      </v-stepper-content>

      <v-stepper-content step="2">
        <v-card
          class="mb-12 order-container"
          elevation="0"
          height="48vh"
          width="100%"
        >
          <location-sheet :location="location"/>
        </v-card>

        <v-btn
          v-if="isLocation"
          color="primary"
          @click="nextStep"
          absolute
          left
        >
          مرحله بعد
        </v-btn>

        <v-btn
          v-if="isLocation"
          text
          @click="e1 = 1"
          absolute
          right
        >
          مرحله قبل
        </v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
import OrdersSheet from "~/components/cart/order/OrdersSheet";
import TotalPrice from "~/components/cart/order/TotalPrice";
import LocationSheet from "~/components/cart/location/LocationSheet";

export default {
  name: "CartStepper",
  components: {LocationSheet, TotalPrice, OrdersSheet},
  data() {
    return {
      e1: 1,
    }
  },
  computed: {
    orders() {
      return this.$store.state.orders
    },
    isOrder() {
      return this.orders.length > 0
    },
    location() {
      return this.$store.state.location
    },
    isLocation() {
      return this.location.state
    }
  },
  created() {
    if (process.client) {
      this.$store.dispatch("initOrders")
      this.$store.dispatch("initLocation")
    }
  },
  methods: {
    nextStep() {
      this.$router.push("/orders")
      this.$store.dispatch('setFinalOrders')
    },
  },
}
</script>

<style lang="scss" scoped>
.empty {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 40vh;
}
.order-container{
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
