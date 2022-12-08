<template>
  <div class="container">
    <v-row>
      <v-col cols="12" md="6" class="right">
        <v-row>
          <h2>{{ this.title }}</h2>
        </v-row>
        <v-row>
          <v-col cols="12">
            <img :src="this.images">
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <div class="left">
          <div>
            <div class="desc" v-html="this.description"></div>
            <div class="price">
              {{ this.reformatPrice }} تومان
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
      type: Number,
      require: true,
    },
    images: {
      type: String,
      require: false,
      default: "/images/image-placeholder.gif"
    },
  },
  data() {
    return {}
  },
  methods: {
    addToCart() {
      this.$emit("add-cart");
    }
  },
  computed: {
    reformatPrice(){
      return this.price.toLocaleString()
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
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .desc {
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
