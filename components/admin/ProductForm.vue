<template>
  <div>
    <v-layout class="my-5">
      <v-flex sm12 md10 offset-md1>
        <v-card class="pa-3" elevation="4" light tag="section">
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
            class="ma-3">

            <v-text-field
              type="text"
              :rules="inputRules"
              label="نام محصول"
              v-model="newProduct.name"
            ></v-text-field>

            <editor :content="newProduct.description"/>

            <v-divider class="my-5"></v-divider>
            <v-text-field
              type="text"
              :rules="inputRules"
              label="قیمت محصول"
              v-model.number="newProduct.price"
            ></v-text-field>

            <v-file-input
              label="تصویر محصول"
              :rules="inputRules"
              multiple
              chips
              prepend-icon="mdi-camera"
              @change="savePhoto($event)"
            ></v-file-input>

            <v-row>
              <v-col cols="2" v-if="newProduct.thumbnail_url">
                <img width="100px" :src="newProduct.thumbnail_url">
              </v-col>
            </v-row>
            <div class="py-3 d-flex justify-end">
              <v-btn
                color="primary"
                large
                class="mx-2"
                @click="onSave()">
                ثبت
              </v-btn>
              <v-btn
                color="primary"
                large
                class="mx-2"
                @click="onCancel()">
                لغو
              </v-btn>
            </div>
          </v-form>
        </v-card>
      </v-flex>

    </v-layout>
  </div>
</template>

<script>

import Editor from "~/components/general/editor";
export default {
  name: "ProductForm",
  components: {Editor},
  props: {
    product: {
      type: Object,
      require: false,
    }
  },
  created() {
    if (this.product){
      this.newProduct = this.product
    }
    console.log("sended product => " , this.newProduct)
  },

  data() {
    return{
      valid: true,
      newProduct: {
        orderNum: 1
      },
      files: [],
      inputRules: [v => !!v || 'پر کردن این فیلد الزامی است',],
    }
  },

  methods: {
    onSave(){
      if (this.newProduct.title === null || this.newProduct.price === null || this.newProduct.images === []){
        this.$refs.form.validate()
      }
      else {
        // this.$store.dispatch("setProducts", this.newProduct)
        // this.$router.push("/admin")
        console.log(this.newProduct.title)
      }
    },
    onCancel(){
      this.$router.push("/admin")
    },
    savePhoto(files){
      for (const file in files) {
        this.newProduct.images.push(`/images/${files[file].name}`)
      }
    },
  },
  computed: {
  }
}
</script>

