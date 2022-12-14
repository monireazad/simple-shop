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
  name: 'DefaultLayout',
  components: {TopNavigation, SideNavigation},
  data() {
    return {
      items: [
        {
          icon: 'mdi-storefront-outline',
          title: 'محصولات',
          to: '/products',
        },
        {
          icon: 'mdi-cart',
          title: 'سبد خرید',
          to: '/cart',
        },

      ],
    }
  },
  created() {
    if (process.client){
      this.$store.dispatch("initOrders")
    }
  }
}
</script>
