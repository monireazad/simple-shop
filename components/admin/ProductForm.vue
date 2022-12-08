<template>
  <div>
    <div class="ma-5 ">
      <v-row class="mx-1 d-flex justify-end">
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
          @click="onCancel()">
          لغو
        </v-btn>
      </v-row>

      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
        class="ma-3">
        <v-row>
          <v-col cols="12" md="8">
            <v-card class="pa-7" elevation="4" light tag="section">
              <v-text-field
                type="text"
                :rules="inputRules"
                label="نام محصول"
                v-model="newProduct.name"
              ></v-text-field>

              <editor :content="newProduct.description"/>

              <v-divider class="my-5"></v-divider>

              <v-file-input
                label="تصویر محصول"
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
            </v-card>
          </v-col>
          <v-col cols="12" md="4">
            <v-card class="pa-7" elevation="4" light tag="section">
              <v-text-field
                type="text"
                :rules="inputRules"
                label="قیمت محصول"
                v-model.number="newProduct.price"
                :hint="formattedPrice"
                persistent-hint
                class="mb-4"
              ></v-text-field>

              <v-select
                :rules="inputRules"
                :items="categories"
                item-text="name"
                v-model="newProduct.category.name"
                label="دسته بندی"
              ></v-select>

              <v-text-field
                type="number"
                label="موجودی انبار"
                v-model.number="newProduct.stock"
                min="0"
              ></v-text-field>

            </v-card>
          </v-col>
        </v-row>
      </v-form>


    </div>
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
    if (this.product) {
      this.newProduct = this.product
    }
  },

  data() {
    return {
      valid: true,
      newProduct: {
        orderNum: 1,
        category: {},
        stock: 0,
        price: 0,
      },
      files: [],
      inputRules: [v => !!v || 'پر کردن این فیلد الزامی است',],
    }
  },

  methods: {
    onSave() {
      this.valid = this.$refs.form.validate()
      if (this.valid) {
        // this.$store.dispatch("setProducts", this.newProduct)
        // this.$router.push("/admin")
        console.log('product save')
      }
    },
    onCancel() {
      this.$router.push("/admin")
    },
    savePhoto(files) {
      for (const file in files) {
        this.newProduct.images.push(`/images/${files[file].name}`)
      }
    },
  },

  computed: {
    categories() {
      return this.$store.state.categories
    },
    formattedPrice() {
      return `${this.newProduct.price.toLocaleString()} تومان`
    }
  }
}
</script>

