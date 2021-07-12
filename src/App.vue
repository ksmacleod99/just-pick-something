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
  app
    >
    <ul class="nav">
      <router-link to="/"> 
        <li>
          Home
        </li>
      </router-link>
      <router-link to="cookbook">
        <li>
          Cookbook
        </li>
      </router-link>
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
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  data(){
    return {
      //
      }
  },
   created () {
    this.$store.dispatch('initCosmic')
  },
   computed: {
    ...mapGetters([
      'loading'
    ]),
    drawer: {
      get () {
        return this.$store.state.drawer
      },
      set (val) {
        this.$store.commit('setDrawer', val)
      }
    }
  },

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
