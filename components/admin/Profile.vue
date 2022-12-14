<template>
  <v-layout class="my-5" wrap>
    <v-flex sm12 md8 offset-md2>
      <v-card elevation="4" light tag="section" :loading="loading">

        <template slot="progress">
          <v-progress-linear
            color="light-green lighten-4"
            height="5"
            indeterminate
          ></v-progress-linear>
        </template>

        <v-card-title>
          <h4>
            اطلاعات حساب کاربری
          </h4>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
          >

            <v-row>
              <v-col cols="6">
                <v-text-field
                  outline
                  required
                  :rules="inputRules"
                  label="نام"
                  type="text"
                v-model="user.name"></v-text-field>
              </v-col>

              <v-col cols="6">
                <v-text-field
                  outline
                  required
                  :rules="inputRules"
                  label="نام خانوادگی"
                  type="text"
                v-model="user.family"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  outline
                  required
                  :rules="inputRules"
                  label="موبایل"
                  type="text"
                  :value="user.mobile"
                  readonly
                  disabled></v-text-field>
              </v-col>

              <v-col cols="6">
                <v-text-field
                  outline
                  required
                  :rules="inputRules"
                  label="ایمیل"
                  type="text"
                v-model="user.email"></v-text-field>
              </v-col>
            </v-row>

            <v-btn
              class="mt-3"
              color="primary"
              large
              @click="save"
              :disabled="loading"
            >
              ذخیره
            </v-btn>

            <snack-bar :snackbar-status="snackbar.status" :color="snackbar.color" :message="snackbar.message"/>
          </v-form>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import SnackBar from "~/components/general/Snackbar";
export default {
  name: "AdminProfile",
  components: {SnackBar},
  props: {
    user: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      loading: false,
      snackbar: {
        status: false,
        color: '',
        message: '',
      },
      valid: true,
      inputRules: [v => !!v || 'پر کردن این فیلد الزامی است',],
    }
  },

  methods: {
    async save() {
      this.valid = this.$refs.form.validate()
      if (this.valid){
        this.loading = true
        const {data} = await this.$axios.post('/management/users/update' , this.user)
        this.loading = false
        this.snackbar.status = true
        this.snackbar.message = data.message
        if (data.is_success){
          this.snackbar.color = 'green'
        }else {
          this.snackbar.color = 'red darken-3'
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
