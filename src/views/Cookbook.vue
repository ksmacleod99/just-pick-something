<template>
  <div>
    <div class="top">
      <router-link to="/add_recipe">
        <v-btn
          class="ma-2"
          color="#5ECC65"
        >
        Add Recipe
        <v-icon small right>mdi-plus</v-icon>
      </v-btn>
      </router-link>
    </div>

    <div class="container" ref="allRecipes">
      <RecipeCard
        v-for="recipe in recipes"
        :recipe="recipe"
        :key="recipe.id"
      />
    </div>
  </div> 
</template>

<script>

import RecipeCard from "../components/RecipeCard";
import { mapGetters } from 'vuex'

export default {
  name: 'Cookbook',
  data(){
   //
  },
  components: {
    RecipeCard
  },
  mounted () {
    //
  },
  computed: {
    ...mapGetters([
      'loading',
      'recipes',
    ]),
    recipes() {
        return this.$store.getters.recipes
    },
  },
}

</script>

<style scoped>
.container {
  display: flex;
  flex-flow: row wrap;
  padding: .25em;
  margin: .25em;

}
.top {
  margin: 1em;
  padding: 10px;
}
</style>