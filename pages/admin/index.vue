<template>
  <div>
    <section class="new-products" v-if="isAdmin">
      <v-btn
        color="primary"
        @click="createPost"
      >
        اضافه کردن محصول جدید
      </v-btn>
    </section>
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

  data(){
    return{
      isAdmin: true,
    }
  },
  computed: {
    listOfProduct() {
      return this.$store.getters.listOfProduct
    }
  },
  methods:{
    createPost(){
      this.$router.push("/admin/new-product")
    }
  }

}
</script>

<style scoped>

</style>
