<template>
  <v-layout class="my-5" wrap>
    <v-flex sm12 md6 offset-md3>
      <v-card elevation="4" light tag="section">
        <v-card-title>
          <h3 class="headline">
            ورود ادمین سایت
          </h3>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-form>
            <v-text-field
              outline
              label="نام کاربری"
              type="text"
              v-model="username"></v-text-field>
            <v-text-field
              outline
              hide-details
              label="رمز ورود"
              type="password"
              v-model="password"></v-text-field>
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="pa-3">
          <v-btn
            color="primary"
            large
            @click="login"
          >
            ورود
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-flex>

  </v-layout>
</template>

<script>
export default {
  name: "LoginPage",

  data() {
    return {
      password: null,
      username: null
    }
  },
  methods: {
    login() {
      if (this.username == null || this.password == null) return
      else {
        this.$store.dispatch('login', {username: this.username, password: this.password})
        if (this.$store.getters.isAuthenticated){
          this.$router.push('/admin')
        }else {
          alert("username or password not correct!")
        }
      }
    }
  }
}
</script>

<style scoped>
</style>
