<template>
  <v-app-bar fixed app elevation="1" color="accent">
    <v-btn
      icon
      absolute
      left
      large
      to="/admin"
      class="mx-4"
      color="primary"
    >
      <v-icon>mdi-account</v-icon>
    </v-btn>
    <v-btn
      text
      left
      large
      color="primary"
      @click="logOut"
      v-if="isAuthenticated"
    >
      log out
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: 'TopNavigation',
  methods: {
    logOut() {
      this.$store.dispatch("logout")
      this.$router.push("/products")
    }
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
