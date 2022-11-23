<template>
  <div class="pa-5">
    <product-list :products="listOfProduct"/>
  </div>
</template>

<script>
import ProductList from "~/components/product/ProductList";

export default {
  name: 'ProductsPage',
  components: {ProductList},

  computed: {
    listOfProduct() {
      return this.$store.state.listOfProduct
    }
  },

}
</script>

<style lang="scss" scoped>
a:-webkit-any-link {
  text-decoration: none;
}
</style>
