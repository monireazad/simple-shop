<template>
  <v-app>
    <side-navigation :items="items"/>
    <top-navigation/>
    <v-main class="base">
      <v-container>
        <Nuxt/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import SideNavigation from "~/components/navigation/SideNavigation";
import TopNavigation from "~/components/navigation/TopNavigation";
export default {
  name: "admin",
  middleware: ['checkAuth' , 'auth'],
  components: {TopNavigation, SideNavigation},
  data() {
    return {
      items: [
        {
          icon: 'mdi-storefront-outline',
          title: 'مدیریت محصولات',
          to: '/admin/#',
        },
        {
          icon: 'mdi-package-variant-closed-plus',
          title: 'افزودن محصول جدید',
          to: '/admin/new-product',
        },
      ],
    }
  },
  created() {
    if (process.client){
      this.$store.dispatch("initProducts")
    }
  }
}
</script>

<style scoped>

</style>
