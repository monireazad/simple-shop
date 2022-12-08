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
      logOut
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  middleware: 'auth',
  methods: {
    async logOut() {
      await this.$auth.logout()
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
