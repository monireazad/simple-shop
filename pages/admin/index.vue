<template>
  <div>
    <section class="exist-products">
      <h1 class="py-5">محصولات موجود در فروشگاه</h1>
      <product-table :products="listOfProduct"/>
    </section>
  </div>
</template>

<script>
import ProductTable from "~/components/admin/ProductTable";

export default {
  name: 'AdminPage',
  components: {ProductTable},
  layout: 'admin',
  middleware: ['auth'],

  computed: {
    listOfProduct() {
      return this.$store.state.adminProducts
    }
  },

}
</script>
