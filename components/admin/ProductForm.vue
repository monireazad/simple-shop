<template>
  <div>
    <div class="ma-5 ">
      <v-row class="mx-1 d-flex justify-end">
        <v-btn
          color="primary"
          large
          class="mx-2"
          :disabled="loading"
          @click="onSave()">
          ثبت
        </v-btn>
        <v-btn
          color="primary"
          large
          :disabled="loading"
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
            <v-card class="pa-7" elevation="4" light tag="section" :loading="loading">
              <template slot="progress">
                <v-progress-linear
                  color="light-green lighten-4"
                  height="5"
                  indeterminate
                ></v-progress-linear>
              </template>
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
                @change="setPhoto($event)"
              ></v-file-input>

              <v-row>
                <v-col cols="2" v-if="newProduct.thumbnail_url">
                  <img width="100px" :src="newProduct.thumbnail_url">
                </v-col>
              </v-row>
            </v-card>
          </v-col>
          <v-col cols="12" md="4">
            <v-card class="pa-7" elevation="4" light tag="section" :loading="loading">
              <template slot="progress">
                <v-progress-linear
                  color="light-green lighten-4"
                  height="5"
                  indeterminate
                ></v-progress-linear>
              </template>

              <v-select
                :rules="inputRules"
                :items="status"
                item-text="name"
                v-model="productStatus"
                label="وضعیت"
              ></v-select>

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
                v-model="productCategory"
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
      loading: false,
      newProduct: {
        orderNum: 1,
        stock: 0,
        price: 0,
        status: 'فعال',
      },
      status: ['فعال', 'غیر فعال'],
      files: [],
      inputRules: [v => !!v || 'پر کردن این فیلد الزامی است',],
    }
  },

  methods: {
    async onSave() {
      this.valid = this.$refs.form.validate()
      if (this.valid) {
        // this.newProduct.prices = []
        // this.newProduct.thumbnail_id = this.newProduct.thumbnail_file_id

        this.loading = true
        const response = await this.$axios.patch(`/shop/products/${this.newProduct.id}`, this.newProduct)
        this.loading = false


        // this.$store.dispatch("setProducts", this.newProduct)
        // this.$router.push("/admin")

      }
    },
    onCancel() {
      this.$router.push("/admin")
    },
    setPhoto(files) {
      for (const file in files) {
        this.newProduct.images.push(`/images/${files[file].name}`)
      }
    }, 
  },

  computed: {
    categories() {
      return this.$store.state.categories
    },
    productCategory() {
      if (this.product) {
        return this.categories.find(x => x.id === this.newProduct.category_id).name
      }
    },
    productStatus() {
      return this.newProduct.status === 1 ? 'فعال' : 'غیر فعال'
    },
    formattedPrice() {
      return `${this.newProduct.price.toLocaleString()} تومان`
    }
  }
}
</script>

