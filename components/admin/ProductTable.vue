<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="products"
      :hide-default-footer="true"
      class="elevation-1"

      @page-count="pageCount = $event"
      :page.sync="page"
      :items-per-page="6"
    >
      <template v-slot:top>
        <v-dialog v-model="dialogDelete" max-width="400px">
          <v-card>
            <v-card-title class="text-h5">آیا از انجام این کار مطمئن هستید؟</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">خیر</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">بله</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </template>

      <template v-slot:item.thumbnail_url="{ item }">
        <img
          @click="editProduct(item)"
          :src="item.thumbnail_url"
          class="pro-image mt-2"
        />
      </template>

      <template v-slot:item.price="{ item }">
        {{ item.price.toLocaleString() }}
      </template>

      <template v-slot:item.actions="{ item }">
        <v-icon
          color="red darken-3"
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
    <v-row>
      <div class="pagination">
        <v-pagination
          v-model="page"
          :length="pageCount"
        ></v-pagination>
      </div>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "ProductTable",
  props: {
    products: {
      type: Array,
      require: true,
    },
  },


  data: () => ({
    page: 1,
    pageCount: 0,
    headers: [
      {
        text: '',
        align: 'start',
        sortable: false,
        value: 'thumbnail_url',
      },
      {text: 'عنوان محصول', sortable: false, value: 'name'},
      {text: 'قیمت(تومان)', value: 'price'},
      {text: 'موجودی انبار', value: 'stock'},
      {
        text: '',
        value: 'actions',
        align: 'end',
        sortable: false
      },
    ],
    dialog: false,
    dialogDelete: false,
    editedIndex: -1,
    editedItem: {}
  }),

  watch: {
    dialogDelete (val) {
      val || this.closeDelete()
    },
  },
  methods: {
    editProduct(item) {
      this.$router.push(`/admin/${item.id}`)
    },
    deleteItem (item) {
      this.editedIndex = this.products.indexOf(item)
      this.editedItem = item
      this.dialogDelete = true
    },
    deleteItemConfirm () {
      this.$store.dispatch("removeProduct" , this.editedItem)
      this.products.splice(this.editedIndex, 1)
      this.closeDelete()
    },
    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedIndex = -1
      })
    },
  },

}
</script>

<style lang="css" scoped>
.pro-image {
  cursor: pointer;
  width: 70px;
  height: 40px;
}

.pagination{
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 30px 0;
}
</style>
