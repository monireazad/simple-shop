<template>
    <v-row>
      <v-col cols="12" md="4" v-for="(product , index) in products" :key="index">
        <nuxt-link class="pro-link" :to="isAdmin ? `/admin/${product.id}` : `/products/${product.id}`">
          <product-card
            :id="product.id"
            :image="product.images[0]"
            :title="product.title"
            :price="product.price"
            :is-admin="isAdmin"
            @deleteProduct="deleteProduct(index)"
          />
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
    },
    isAdmin: {
      type: Boolean,
      default: false,
      require: false,
    }
  },
  data() {
    return {
    }
  },
  methods: {
    deleteProduct(id){
      this.$store.dispatch("removeProducts" , this.products[id])
    },
  }
}
</script>

<style lang="scss" scoped>
a:-webkit-any-link {
  text-decoration: none;
}
</style>
