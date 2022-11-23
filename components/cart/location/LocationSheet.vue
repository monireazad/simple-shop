<template>
  <div>
    <div v-if="isLocation">
      <v-row class="d-flex justify-center my-8">
        <v-col cols="6">
          <location-card
            :location="location"
            @deleteLoc="loadLocation"/>
        </v-col>
      </v-row>
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
      checkedRadio: 0,
    }
  },
  props: {
    location: {
      type : Object,
      required: true,
    }
  },
  computed: {
    isLocation() {
      return this.location.state
    }
  },
  methods: {
    loadLocation() {
      this.$store.dispatch("initLocation")
    },
  }
}
</script>

<style scoped>
.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 40vh;
}
</style>
