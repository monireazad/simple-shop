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

              <tiptap-vuetify v-model="newProduct.description" :extensions="extensions"/>

              <v-divider class="my-5"></v-divider>

              <v-file-input
                label="تصویر محصول"
                multiple
                chips
                :clearable="false"
                :loading="loading"
                prepend-icon="mdi-camera"
                @change="setPhoto($event)"
              ></v-file-input>

              <v-row>
                <template v-if="imagesUrl.length > 0">
                  <v-col cols="2" v-for="(file, index) in imagesUrl" :key="index">
                    <img width="100px" :src="file">
                  </v-col>
                </template>
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
                v-model="newProduct.status"
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
                v-model="newProduct.category"
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

      <snack-bar :snackbar-status="snackbar.status" :color="snackbar.color" :message="snackbar.message"/>

    </div>
  </div>
</template>

<script>

import Editor from "~/components/general/editor";
import SnackBar from "~/components/general/Snackbar";
import {
  TiptapVuetify,
  Heading,
  Bold,
  Italic,
  Strike,
  Underline,
  Code,
  Paragraph,
  BulletList,
  OrderedList,
  ListItem,
  Link,
  Blockquote,
  HardBreak,
  HorizontalRule,
  History
} from 'tiptap-vuetify'

export default {
  name: "ProductForm",
  components: {SnackBar, Editor, TiptapVuetify},
  props: {
    product: {
      type: Object,
      require: false,
    }
  },

  data() {
    return {
      valid: true,
      loading: false,
      newProduct: {
        name: '',
        description: '',
        stock: "0",
        price: 0,
        status: 'فعال',
        category: '',
        images: [],
        orderNum: 1,
      },
      productModel: {
        discount: 0,
        brand_id: null,
        continue_sell: 0,
        short_description: null,
        min_order_quantity: 1,
        features: [],
        max_order_quantity: 10,
        details: null,
        type_id: 1,
        collection_ids: [],
        channel_id: [1, 2],
        tags: [],
        has_multi_price: 0,
        prices: [],
        code: null,
        barcode: null
      },

      image_ids: [],
      imagesUrl: [],
      status: ['فعال', 'غیر فعال'],
      files: [],
      inputRules: [v => !!v || 'پر کردن این فیلد الزامی است',],
      snackbar: {
        status: false,
        color: '',
        message: '',
      },
      extensions: [
        History,
        Blockquote,
        Link,
        Underline,
        Strike,
        Italic,
        ListItem,
        BulletList,
        OrderedList,
        [
          Heading,
          {
            options: {
              levels: [1, 2, 3]
            }
          }
        ],
        Bold,
        Link,
        Code,
        HorizontalRule,
        Paragraph,
        HardBreak
      ],
    }
  },

  created() {
    if (this.product) {
      for (const index in this.product.images) {
        this.imagesUrl.push(this.product.images[index].full_url)
      }
      this.newProduct.name = this.product.name
      this.newProduct.description = this.product.description
      this.newProduct.stock = this.product.stock
      this.newProduct.price = this.product.price
      this.newProduct.category = this.categoryName
      this.newProduct.status = this.productStatus
    }
  },

  methods: {
    normalizeData() {
      if (this.product.has_multi_price === false) {
        this.product.has_multi_price = 0
        this.product.prices = []
      }
      //set thumbnail_id
      this.product.thumbnail_id = this.product.thumbnail.id
      //set image_ids
      for (const index in this.product.images) {
        this.image_ids.push(this.product.images[index].id)
      }
      this.product.image_ids = this.image_ids
    },

    async onSave() {
      this.valid = this.$refs.form.validate()
      if (this.valid) {

        //update product
        if (this.product) {
          //set data
          this.product.name = this.newProduct.name
          this.product.description = this.newProduct.description
          this.product.stock = this.newProduct.stock
          this.product.price = this.newProduct.price
          this.product.category_id = this.categoryId
          this.product.status = this.newStatus

          this.normalizeData()

          //upload data
          this.loading = true
          const {data} = await this.$axios.patch(`/shop/products/${this.product.id}`, this.product)
          this.snackbar.status = true
          this.snackbar.message = data.message
          if (data.is_success) {
            this.snackbar.color = 'green'
            this.$router.push('/admin')
          }
          this.loading = false
        }
        //add product
        else {
          //set data
          this.productModel.name = this.newProduct.name
          this.productModel.description = this.newProduct.description
          this.productModel.stock = this.newProduct.stock
          this.productModel.price = this.newProduct.price
          this.productModel.purchase_price = this.newProduct.price
          this.productModel.category_id = this.categoryId
          this.productModel.status = this.newStatus
          this.productModel.image_ids = this.image_ids
          this.productModel.thumbnail_id = this.image_ids[0]

          //upload
          this.loading = true
          const {data} = await this.$axios.post('/shop/products/complete', this.productModel)
          this.loading = false
          this.snackbar.status = true
          this.snackbar.message = data.message
          if (data.is_success) {
            this.snackbar.color = 'green'
            this.$router.push('/admin')
          }

        }
      }
    },

    onCancel() {
      this.$router.push("/admin")
    },

    async setPhoto(event) {
      this.files = event
      const formData = new FormData()
      formData.append('dir', 'products')
      for (const file in this.files) {
        formData.append('file[]', this.files[file], this.files[file].name)
      }
      this.loading = true
      const {data} = await this.$axios.post('/management/filemanager/files/multiple', formData)
      this.loading = false

      const addedImages = data.entity.files
      if (this.product) {
        for (const index in addedImages) {
          this.product.images.push(addedImages[index])
        }
      } else {
        for (const index in addedImages) {
          this.newProduct.images.push(addedImages[index])
          this.image_ids.push(addedImages[index].id)
          this.imagesUrl.push(addedImages[index].full_url)
        }
      }
    },
  },

  computed: {
    categories() {
      return this.$store.state.categories
    },

    categoryId() {
      return this.categories.find(x => x.name === this.newProduct.category).id
    },

    categoryName() {
      return this.categories.find(x => x.id === this.product.category_id).name
    },

    newStatus() {
      return this.newProduct.status === 'فعال' ? 1 : 0
    },

    formattedPrice() {
      return `${this.newProduct.price.toLocaleString()} تومان`
    },

    productStatus() {
      if (this.product) {
        return this.product.status === 1 ? 'فعال' : 'غیر فعال'
      }
    },
  },
}
</script>

