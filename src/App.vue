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
      <li 
        v-for="(item, i) in menu"
        :key="i"
        router
        exact
        :to="item.link">
        {{ item.title }}
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
      'menu',
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
