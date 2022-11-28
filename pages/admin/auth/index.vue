<template>
  <div>
    <login-page/>
  </div>
</template>

<script>
import LoginPage from "~/components/admin/LoginForm";
export default {
  middleware: 'checkAuth',
  components: {LoginPage}
}
</script>

<style scoped>

</style>
