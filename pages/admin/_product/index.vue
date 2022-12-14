<template>
  <div>
    <product-form :product="product"/>
  </div>
</template>

<script>
import ProductForm from "~/components/admin/ProductForm";
export default {
  layout: 'admin',
  components: {ProductForm},
  computed: {
    product() {
      const index = this.$store.state.adminProducts.findIndex(
        (item) => item.id == this.$nuxt.context.params.product
      )
      if (index > -1){
        return this.$store.state.adminProducts[index]
      }
    }
  },
}
</script>

<style scoped>

</style>
