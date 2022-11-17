<template>
  <div>
    <div v-for="(order,index) in orders" :key="order.id">
      <v-row id="cart">
        <v-col cols="2">
          <img :src="order.images[0]"/>
        </v-col>
        <v-col cols="9" class="inform">
          <p>{{ order.title }}</p>
          <p>{{ order.price.toLocaleString() }}</p>
          <div class="quantity">
            <div class="qty-minus" @click="changeQty('minus' , index)">-</div>
            <div class="qty">{{ order.orderNum }}</div>
            <div class="qty-plus" @click="changeQty('plus' , index)">+</div>
          </div>
        </v-col>
        <v-col cols="1">
          <v-icon class="del" color="red" @click="deleteRow(index)">mdi-delete</v-icon>
        </v-col>
      </v-row>
      <v-divider></v-divider>
    </div>
  </div>
</template>

<script>
export default {
  name: "OrderRow",
  props: {
    orders: {
      type: Array,
      require: true,
    },
  },
  methods: {
    changeQty(status, id) {
      if (status === 'minus') {
        if (this.orders[id].orderNum > 1) {
          this.orders[id].orderNum -= 1
        }
      } else if (status === 'plus') {
        this.orders[id].orderNum += 1
      }
      this.$store.dispatch("setOrders", this.orders[id])
    },
    deleteRow(id) {
      this.$store.dispatch("removeOrders", this.orders[id])
    },
  },
}
</script>

<style lang="scss" scoped>

#cart {
  margin: 10px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;

  img {
    width: 70%;
  }

  .inform {
    display: flex;
    align-items: center;
    justify-content: space-around;


    .quantity {
      display: flex;
      align-items: center;
      justify-content: start;

      .qty-minus {
        width: 20px;
        text-align: center;
        cursor: pointer;
      }

      .qty {
        width: 20px;
        text-align: center;
      }

      .qty-plus {
        width: 20px;
        text-align: center;
        cursor: pointer;
      }
    }
  }

  .del {
    cursor: pointer;
  }

}

</style>
