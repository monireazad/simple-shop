<template>
  <div>
    <ProductInfo
      :title="product.name"
      :description="product.description"
      :price="product.price"
      :images="product.thumbnail_url"
      @add-cart="addToCart"
    />
  </div>
</template>

<script>
import ProductInfo from "~/components/product/ProductInfo";


export default {
  components: {ProductInfo},

  data() {
    return{
      order: {},
    }
  },
  methods: {
    addToCart() {
      const index = this.$store.state.orders.findIndex(
        (item) => item.id === this.product.id
      );
      if (index > -1) {
        this.order.orderNum += 1
      }
      this.$store.dispatch("setOrders" , this.order)
      this.$router.push("/cart")
    }
  },
  computed: {
    product() {
      const index = this.$store.state.products.findIndex(
        (item) => item.id == this.$nuxt.context.params.productId
      )
      if (index > -1){
        const product = this.$store.state.products[index]
        this.order = {
          id: product.id,
          image: product.thumbnail_url,
          title: product.name,
          price: product.price,
          orderNum: 1
        }
        return product
      }
    }
  },

}
</script>


