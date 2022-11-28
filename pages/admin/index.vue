<template>
  <div>
    <section class="exist-products">
      <h1 class="py-5">محصولات موجود در فروشگاه</h1>
      <product-list :products="listOfProduct" :is-admin="isAdmin"/>
    </section>
  </div>
</template>

<script>
import ProductList from "~/components/product/ProductList";

export default {
  name: 'ProductsPage',
  components: {ProductList},
  layout: 'admin',

  data(){
    return{
      isAdmin: true,
    }
  },
  computed: {
    listOfProduct() {
      return this.$store.state.listOfProduct
    }
  },

}
</script>
