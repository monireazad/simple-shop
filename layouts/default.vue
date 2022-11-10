<template>
  <v-app>
    <side-navigation/>
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
    return {}
  },
  created() {
    if (process.client){
      this.$store.dispatch("initOrders")
    }
  }
}
</script>
