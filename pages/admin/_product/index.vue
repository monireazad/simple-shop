<template>
  <div>
    <product-form :product="product"/>
  </div>
</template>

<script>
import ProductForm from "~/components/admin/ProductForm";
export default {
  components: {ProductForm},
  computed: {
    product() {
      const index = this.$store.getters.listOfProduct.findIndex(
        (item) => item.id == this.$nuxt.context.params.product
      )
      if (index > -1){
        console.log(index)
        return this.$store.getters.listOfProduct[index]
      }
    }
  },
}
</script>

<style scoped>

</style>
