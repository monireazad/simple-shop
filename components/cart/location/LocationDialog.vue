<template>
  <v-row class="mx-4 mt-1 justify-end">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="500px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-if="action === 'add'"
          class="ma-3"
          color="primary"
          small
          dark
          v-bind="attrs"
          v-on="on"
        >
          <v-icon
            right
            dark
            class="mx-2"
          >
            mdi-plus-circle-outline
          </v-icon>
          افزودن آدرس جدید
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">افزودن آدرس جدید</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                md="6"
              >
                <v-text-field
                  label="استان *"
                  required
                  dense
                  v-model="location.state"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                md="6"
              >
                <v-text-field
                  label="شهر *"
                  dense
                  v-model="location.city"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                md="6"
              >
                <v-text-field
                  label="نام *"
                  required
                  dense
                  v-model="location.firstName"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                md="6"
              >
                <v-text-field
                  label="نام خانوادگی *"
                  required
                  dense
                  v-model="location.lastName"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                md="6"
              >
                <v-text-field
                  label="کدپستی *"
                  required
                  dense
                  v-model="location.postalCode"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                md="6"
              >
                <v-text-field
                  label="موبایل *"
                  required
                  dense
                  v-model="location.phone"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
              >
                <v-textarea
                  label="آدرس *"
                  required
                  dense
                  auto-grow
                  v-model="location.address"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-row class="alert" v-if="validation">
          <v-col cols="12">
            <div class="text-center">برخی از فیلد ها پر نشده</div>
          </v-col>
        </v-row>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="closeDialog"
          >
            بستن
          </v-btn>
          <v-btn
            color="primary"
            text
            @click="saveLocation"
          >
            ذخیره
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: "LocationDialog",
  data: () => ({
    dialog: false,
    validation: false,
    location: {
      state: null,
      city: null,
      firstName: null,
      lastName: null,
      postalCode: null,
      phone: null,
      address: null,
    },
  }),
  props: {
    action: {
      type: String,
      required: true
    }
  },
  methods: {
    closeDialog() {
      this.dialog = false
      this.location = {}
    },
    saveLocation() {
      if (this.location.state == null || this.location.city == null || this.location.firstName == null ||
          this.location.lastName == null || this.location.phone == null || this.location.address == null){
        this.validation = true
      }
      else {
        this.$store.dispatch("setLocation", this.location)
        this.$emit("addLocation")
        this.dialog = false
        this.location = {}
      }
    }
  },
  computed: {
    uniqueId() {
      const dateString = Date.now().toString(36);
      const randomness = Math.random().toString(36).substr(2);
      return dateString + randomness;
    }
  }
}
</script>

<style>
.alert{
  color: red;
  margin: 0;
  padding: 0;
}
</style>
