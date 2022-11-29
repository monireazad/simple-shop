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
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <v-container>
              <v-row>
                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    label="استان *"
                    :rules="inputRules"
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
                    :rules="inputRules"
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
                    :rules="inputRules"
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
                    :rules="inputRules"
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
                    :rules="inputRules"
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
                    :rules="inputRules"
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
                    :rules="inputRules"
                    required
                    dense
                    auto-grow
                    v-model="location.address"
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>

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
    valid: true,
    dialog: false,
    location: {
      state: null,
      city: null,
      firstName: null,
      lastName: null,
      postalCode: null,
      phone: null,
      address: null,
    },
    inputRules: [v => !!v || 'پر کردن این فیلد الزامی است',],
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
        this.$refs.form.validate()
      }
      else {
        this.$store.dispatch("setLocation", this.location)
        this.$emit("addLocation")
        this.dialog = false
        this.location = {}
      }
    }
  },
}
</script>
