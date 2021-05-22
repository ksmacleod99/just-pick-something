<template>
  <v-app>
  <v-app-bar>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title> Just Pick Something </v-toolbar-title>

    </v-app-bar>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>

</template>


<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
}
</script>
