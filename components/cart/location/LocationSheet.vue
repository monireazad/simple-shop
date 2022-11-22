<template>
  <div class="add-container">
    <div v-if="location.state">
      <v-row class="d-flex justify-center my-8">
        <v-col cols="6">
          <location-card
            :location="location"
            @deleteLoc="loadLocation"/>
        </v-col>
      </v-row>
      <div>
        <v-btn
          class="ma-3"
          color="primary"
          small
          dark
          absolute
          bottom
          left
          @click="nextStep()"
        >
          مرحله بعد
        </v-btn>
        <v-btn
          class="ma-3"
          color="secondary"
          small
          dark
          absolute
          bottom
          right
          @click="lastStep()"
        >
          مرحله قبل
        </v-btn>
      </div>
    </div>
    <div v-else>
      <div>
        <location-dialog action="add" @addLocation="loadLocation"/>
      </div>
      <div class="empty">
        <v-icon
          x-large
          class="my-2"
          color="grey darken-4"
        >
          mdi-map-marker-radius-outline
        </v-icon>
        <h3 class="my-3">آدرسی وجود ندارد</h3>
        <p>برای انجام سفارش می بایست آدرس منتخب خود را اضافه کنید.</p>
      </div>
    </div>

  </div>
</template>

<script>
import LocationDialog from "~/components/cart/location/LocationDialog";
import LocationCard from "~/components/cart/location/locationCard";

export default {
  name: "LocationSheet",
  components: {LocationCard, LocationDialog},
  data() {
    return {
      location: {},
      checkedRadio: 0,
    }
  },
  computed: {
    location() {
      return this.$store.getters.location
    },
  },
  created() {
    if (process.client) {
      this.$store.dispatch("initLocation")
      this.location = this.$store.getters.location
    }
  },
  methods: {
    loadLocation() {
      this.$store.dispatch("initLocation")
      this.location = this.$store.getters.location
    },
    nextStep() {
      this.$router.push("/orders")
      this.$store.dispatch('setFinalOrders')
    },
    lastStep() {
      this.$router.push("/cart")
    }
  }
}
</script>

<style scoped>
.add-container {
  overflow-x: hidden;
  overflow-y: auto;
  height: 100%;
}

.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 60vh;
}
</style>
