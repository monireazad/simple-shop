<template>
  <div>
    <v-card rounded gray class="px-6 pt-5 pb-3">
      <div>
        <p>
          <v-icon color="primary">mdi-map-marker</v-icon>
          {{location.state + "-" + location.city + "-" + location.address}}
        </p>
        <div class="d-flex">
          <p>
            <v-icon color="primary">mdi-account</v-icon>
            {{location.firstName + " " + location.lastName}}
          </p>
          <p class="mr-3">
            <v-icon color="primary">mdi-phone</v-icon>
            {{location.phone}}
          </p>
        </div>
        <p>
          <v-icon color="primary">mdi-code-less-than</v-icon>
          کدپستی:
          {{location.postalCode}}
        </p>
      </div>

      <v-card-actions class="d-flex justify-end ma-0 pa-0">
        <v-btn
          text
          icon
          large
          color="red lighten-2"
          @click="deleteLoc"
        >
          <v-icon>mdi-delete</v-icon>
        </v-btn>

      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "LocationCard",
  components: {},

  data(){
    return{

    }
  },
  props: {
    location: {
      type: Object,
      require: true
    }
  },
  methods: {
    deleteLoc() {
      localStorage.setItem('_location', JSON.stringify({}))
      this.$emit("deleteLoc")
    }
  },
}
</script>

<style scoped>
.v-input--selection-controls{
  margin: 0;
  padding: 0;
}
</style>
