<template>
  <div class="px-5">
    <v-row class="mt-2 mb-5">
      <v-col cols="12">
        <v-card rounded gray class="px-3">
          <v-row>
            <v-col cols="5">
              <h3 class="text-center">محصولات</h3>
              <v-divider class="pb-3"></v-divider>
              <v-row>
                <v-col cols="8">
                  <h5 class="my-2">نام محصول</h5>
                  <div class="px-3" v-for="item in order.orders" :key="item.id">
                    <p>{{item.title}}</p>
                  </div>
                </v-col>
                <v-col cols="4">
                  <h5 class="my-2">تعداد</h5>
                  <div class="px-3" v-for="item in order.orders" :key="item.id">
                    <p>{{item.orderNum}}</p>
                  </div>
                </v-col>
              </v-row>
            </v-col>

            <v-col cols="3">
              <h3 class="text-center">قیمت</h3>
              <v-divider class="pb-3"></v-divider>
              <h5 class="my-2">قیمت واحد محصول</h5>
              <div class="px-3" v-for="item in order.orders" :key="item.id">
                <p>{{item.price.toLocaleString()}}  تومان</p>
              </div>
            </v-col>

            <v-col cols="4">
              <h3 class="text-center">مشخصات ارسال</h3>
              <v-divider class="pb-3"></v-divider>
              <div class="d-flex align-center">
                <h5 class="px-3">آدرس:</h5>
                <p>{{order.userInfo.state}} - {{order.userInfo.city}} - {{order.userInfo.address}}</p>
              </div>
              <div class="d-flex align-center">
                <h5 class="px-3">مشخصات مشتری:</h5>
                <p>{{order.userInfo.firstName}}  {{order.userInfo.lastName}}</p>
              </div>
            </v-col>

          </v-row>
          <v-row>
            <v-col cols="12">
              <div class="total-price d-flex justify-center">
                <h4 class="mx-3">مبلغ کل سفارش:
                  {{totalPrice.toLocaleString()}} تومان
                </h4>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'OrderCard',
  props: {
    order: {
      type: Object,
      required: true,
    }
  },
  computed: {
    totalPrice() {
      let total = 0
      for (const ordersKey in this.order.orders) {
        total += (this.order.orders[ordersKey].price * this.order.orders[ordersKey].orderNum)
      }
      return total
    },
  },
}
</script>

<style scoped>
p{
  margin: 0;
  padding: 3px 0;
}
.total-price,
h3{
  color: #00DC82;
}
</style>
