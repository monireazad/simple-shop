<template>
  <div>
    <product-form :product="product"/>
  </div>
</template>

<script>
import ProductForm from "~/components/admin/ProductForm";
import axios from 'axios'
export default {
  layout: 'admin',
  components: {ProductForm},

  async asyncData({params , $axios}) {
    const id = params.product
    const { data } = await $axios.get(`https://monireh.faryadresan.ir/api/v1/shop/products/${id}`)
    return {
      product: data.entity
    }
  },
}
</script>

<style scoped>

</style>
