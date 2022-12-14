<template>
  <v-layout class="my-5" wrap>
    <v-flex sm12 md6 offset-md3>
      <v-card elevation="4" light tag="section">
        <v-card-title>
          <h3>
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
              {{ error }}

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
      username: '09140912025',
      password: 'azad3256',
      error: '',
      inputRules: [v => !!v || 'پر کردن این فیلد الزامی است',],
    }
  },
  methods: {
    async login() {
      this.valid = this.$refs.form.validate()
      if(this.valid) {
        try {
          const response = await this.$axios.$post("/auth/login/admin", {
            login: this.username,
            password: this.password
          })
          this.$auth.setUserToken(response.token)
          await this.$router.push('/')
          await this.$store.dispatch('initCategory')
        } catch (e) {
          this.snackbar = true
          this.error = e.response.data.message
        }
      }
    }
  }
}
</script>

<style scoped>
</style>
