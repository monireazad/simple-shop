<template>
  <v-navigation-drawer
    permanent
    right
    app
    fixed
    color="accent"
  >
    <template v-slot:prepend>
      <v-card class="logo pa-4 d-flex justify-center" elevation="0" color="transparent">
        <NuxtLogo/>
      </v-card>
    </template>

    <v-divider></v-divider>

    <v-list dense class="my-2">
      <v-list-item
        v-for="item in items"
        :key="item.title"
        :to="item.to"
        exact
        class="py-2 my-1"
      >
        <v-list-item-icon>
          <v-icon color="primary">{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'SideNavigation',
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  data() {
    return {}
  },
}
</script>

<style lang="scss" scoped>

</style>
