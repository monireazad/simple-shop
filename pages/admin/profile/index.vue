<template>
  <div>
    <admin-profile :user="loggedInUser"/>
  </div>
</template>

<script>
export default {
  layout: 'admin',

  computed: {
    loggedInUser() {
      return this.$store.getters.loggedInUser
    }
  }
}
</script>

<style scoped>

</style>
