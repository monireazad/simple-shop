<template>
  <div class="container">
    <v-row>
      <v-col cols="12" md="6" class="right">
        <v-row>
          <v-col cols="12">
            <img class="headset" :src="this.images[0]">
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="3" v-for="(image,index) in images" :key="index">
            <img class="headset" :src="image">
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="6">
        <div class="left">
          <div>
            <h3 class="product">{{ this.title }}</h3>
            <div class="desc">
              {{ this.description }}
            </div>
            <div class="price">
              {{ this.price }}
            </div>
          </div>

          <div class="btn">
            <v-btn
              color="primary"
              width="200px"
              @click="addToCart"
            >
              افزودن به سبد خرید
            </v-btn>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props:{
    title: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    price: {
      type: String,
      require: true,
    },
    images: {
      type: Array,
      require: false,
      default() {
        return ["/images/image-placeholder.gif" , "/images/image-placeholder.gif"]
      },
    },
  },
  data() {
    return {}
  },
  methods: {
    addToCart() {
      this.$emit("add-cart");
    }
  }
}
</script>

<style lang="scss" scoped>

.container {
  margin: auto;
  background: transparent;
  width: 90%;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15), 0 3px 6px rgba(0, 0, 0, 0.15);
}

.right {
  padding: 40px;

  img {
    width: 100%;
  }
}

.left {
  padding: 30px 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .product {
    font-size: 25pt;
    font-weight: 500;
    color: #666;
  }

  .desc {
    margin-top: 20px;
    color: #777;
  }

  .price {
    margin-top: 20px;
    margin-bottom: 30px;
    font-size: 28px;
    font-weight: 400;
    display: inline-flex;
  }

  .btn{
    display: flex;
    width: 100%;
    justify-content: end;
    margin: 0 -30px;
  }
}
</style>
