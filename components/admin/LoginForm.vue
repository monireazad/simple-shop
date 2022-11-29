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
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <v-text-field
              outline
              required
              :rules="inputRules"
              label="نام کاربری"
              type="text"
              v-model="username"></v-text-field>

            <v-text-field
              outline
              required
              :rules="inputRules"
              label="رمز ورود"
              type="password"
              v-model="password"></v-text-field>
            <v-snackbar
              v-model="snackbar"
              color="red darken-3"
            >
              نام کاربری یا رمز ورود وارد شده صحیح نمیباشد.

              <template v-slot:action="{ attrs }">
                <v-btn
                  text
                  v-bind="attrs"
                  @click="snackbar = false"
                >
                  <v-icon>mdi-window-close</v-icon>
                </v-btn>
              </template>
            </v-snackbar>
            <v-btn
              class="mt-3"
              color="primary"
              large
              @click="login"
            >
              ورود
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-flex>

  </v-layout>
</template>

<script>
export default {
  name: "LoginPage",

  data() {
    return {
      valid: true,
      snackbar: false,
      password: null,
      username: null,
      inputRules: [v => !!v || 'پر کردن این فیلد الزامی است',],
    }
  },
  methods: {
    login() {
      if (this.username == null || this.password == null){
        this.$refs.form.validate()
      }
      else {
        this.$store.dispatch('login', {username: this.username, password: this.password})
        if (this.$store.getters.isAuthenticated) {
          this.$router.push('/admin')
        } else {
          this.$refs.form.validate()
          this.snackbar = true
        }
      }
    }
  }
}
</script>

<style scoped>
</style>
