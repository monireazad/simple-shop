<template>
  <div>
    <ProductInfo
      :title="product.title"
      :description="product.desc"
      :price="product.price"
      :main-image="product.image"
      :sub-images="product.subImage"
      @add-cart="addToCart"
    />
  </div>
</template>

<script>
import ProductInfo from "~/components/product/ProductInfo";


export default {
  components: {ProductInfo},

  methods: {
    addToCart() {

      const index = this.$store.getters.orders.findIndex(
        (item) => item.id === this.product.id
      );
      if (index > -1) {
        this.product.orderNum += 1
      }
      this.$store.dispatch("setOrders" , this.product)
      this.$router.push("/cart")
    }
  },
  computed: {
    product() {
      return this.$store.getters.listOfProduct[this.$nuxt.context.params.productId - 1]
    }
  },

}
</script>


