<template>
    <v-row>
      <v-col cols="12" md="4" v-for="product in products" :key="product.id">
        <nuxt-link class="pro-link" :to="`/products/${product.id}`">
          <product-card
            :id="product.id"
            :image="product.image"
            :title="product.title"
            :price="product.price"/>
        </nuxt-link>
      </v-col>
    </v-row>
</template>

<script>
import ProductCard from "~/components/product/ProductCard";

export default {
  name: 'ProductsPage',
  components: {ProductCard},
  props: {
    products: {
      type: Array,
      require: true,
    }
  },
  data() {
    return {
    }
  },
}
</script>

<style lang="scss" scoped>
a:-webkit-any-link {
  text-decoration: none;
}
</style>
