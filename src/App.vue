<template>
  <v-app>



  <v-app-bar color="#5ECC65">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title> Just Pick Something </v-app-bar-title>
  </v-app-bar>
  <v-navigation-drawer
  v-model="drawer"
  absolute
  temporary
    >
    <ul class="nav">
      <li>
        <router-link to="/">Home</router-link>
      </li>
      <li> Calendar </li>
      <li>
        <router-link to="/cookbook">Cookbook</router-link>
      </li>
    </ul>
  </v-navigation-drawer>

    <v-main relative>
      <v-container fluid>
         <router-view/>
      </v-container>
    </v-main>

  </v-app>

</template>


<script>

export default {
  name: 'App',
  data(){
    return {
    drawer: false,
   }
  }
}
</script>

<style scoped>
.nav{
  padding: 10px;
  list-style: none;
}
.nav li {
  padding: 5px;
  margin: 15px;
  font-weight: bold;
  border-bottom: 1px lightgray solid
}

</style>
