<template>
  <v-card
    max-width="374"
    class="productCard rounded-lg d-flex flex-column align-center"
  >
    <v-btn
      v-if="isAdmin"
      color="pink"
      fab
      dark
      small
      absolute
      top
      left
      stop
      @click.prevent="deleteProduct(id)"
    >
      <v-icon>mdi-delete</v-icon>
    </v-btn>

    <v-img
      height="300"
      width="100%"
      :src="image"
      class="img"
    ></v-img>


    <v-card-title class="font-weight-black">{{ title }}</v-card-title>

    <v-card-text>
      <div class="price text-center font-weight-bold text-h6">{{ reformatPrice }} تومان</div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    id: {
      type: String,
      require: true,
    },
    image: {
      type: String,
      require: false,
      default: "/images/image-placeholder.gif",
    },
    title: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    isAdmin: {
      type: Boolean,
      require: false,
      default: false,
    }
  },
  data() {
    return {}
  },
  methods: {
    deleteProduct(id){
      this.$emit("deleteProduct" , id);
    },
  },
  computed: {
    reformatPrice(){
      return this.price.toLocaleString()
    }
  }
}
</script>

<style lang="scss" scoped>
.productCard{
  //border: 1px solid black;
  background-color: transparent;


  .price{
    //color: #00DC82;
  }
  .img{
    background-size: cover;
  }
}
</style>
