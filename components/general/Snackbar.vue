<template>
  <v-snackbar
    v-model="snackbarStatus"
    :color="color"
  >
    {{ message }}

    <template v-slot:action="{ attrs }">
      <v-btn
        text
        v-bind="attrs"
        @click="snackbarStatus = false"
      >
        <v-icon>mdi-window-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  name: 'SnackBar',
  props: {
    snackbarStatus: {
      type: Boolean,
      required: true,
      default: false
    },
    message: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    }
  }
}
</script>

<style scoped>

</style>
