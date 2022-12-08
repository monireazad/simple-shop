<template>
  <v-layout class="my-5" wrap>
    <v-flex sm12 md8 offset-md2>
      <v-card elevation="4" light tag="section">
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
                  v-model="user.mobile"
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
            >
              ذخیره
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: "AdminProfile",

  props: {
    user: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      valid: true,
      inputRules: [v => !!v || 'پر کردن این فیلد الزامی است',],
    }
  },

  methods: {
    async save() {
      this.valid = this.$refs.form.validate()
      if (this.valid){
        console.log('user save')
      }
    }
  }
}
</script>

<style scoped>

</style>
