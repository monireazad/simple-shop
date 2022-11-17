<template>
  <div>
    <v-btn
      class="ma-3"
      color="primary"
      small
      dark
      absolute
      bottom
      left
    >
      {{btnTitle}}
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "CartActionBtn",
  data() {
    return{
      btnTitle: "مرحله بعد"
    }
  }
}
</script>

<style scoped>

</style>
