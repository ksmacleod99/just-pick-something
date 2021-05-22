<template>
  <v-app>
  <v-app-bar>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title> Just Pick Something </v-toolbar-title>

    </v-app-bar>
    <v-navigation-drawer
        v-model="drawer"
        absolute
        temporary
      >
        <v-list flat>
          <v-list-item-group>

            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                <router-link to="/">Home</router-link>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                Calendar
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                <router-link to="/cookbook">Cookbook</router-link>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

          </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-main>
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
