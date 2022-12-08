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
  middleware: 'auth',
  components: {TopNavigation, SideNavigation},
  data() {
    return {
      items: [
        {
          icon: 'mdi-storefront-outline',
          title: 'مدیریت محصولات',
          to: '/admin',
        },
        {
          icon: 'mdi-package-variant-closed-plus',
          title: 'افزودن محصول جدید',
          to: '/admin/new-product',
        },
        {
          icon: 'mdi-storefront',
          title: 'ورود به فروشگاه',
          to: '/',
        },
      ],
    }
  },
  created() {
      this.$store.dispatch("initProducts")
  }
}
</script>

<style scoped>

</style>
