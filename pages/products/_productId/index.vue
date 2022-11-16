<template>
  <div>
    <ProductInfo
      :title="product.title"
      :description="product.desc"
      :price="product.price"
      :images="product.images"
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
      const index = this.$store.getters.listOfProduct.findIndex(
        (item) => item.id == this.$nuxt.context.params.productId
      )
      if (index > -1){
        console.log(index)
        return this.$store.getters.listOfProduct[index]
      }
    }
  },

}
</script>


