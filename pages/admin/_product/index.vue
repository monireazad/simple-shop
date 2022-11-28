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
      const index = this.$store.state.listOfProduct.findIndex(
        (item) => item.id == this.$nuxt.context.params.product
      )
      if (index > -1){
        console.log(index)
        return this.$store.state.listOfProduct[index]
      }
    }
  },
}
</script>

<style scoped>

</style>
