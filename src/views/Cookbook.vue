<template>
  <div class="cookbook">
    <div class="top">
      <v-btn
        class="ma-2"
        color="#5ECC65"
        @click="openAddForm"
      >
        Add Recipe
        <v-icon small>mdi-plus</v-icon>
      </v-btn>
    </div>

    <div class="container" ref="allRecipes">
      <RecipeCard
        v-for="recipe in recipes"
        :recipe="recipe"
        :key="recipe.id"
      />
    </div>
  </div> 
  <RecipeForm></RecipeForm>
</template>

<script>

import RecipeCard from "../components/RecipeCard";
import RecipeForm from "../components/RecipeForm";
import { mapGetters } from 'vuex'

export default {
  name: 'Cookbook',
  data(){
   //
  },
  components: {
    RecipeCard,
    RecipeForm
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
  methods: {
    openAddForm(){
       this.$store.dispatch('setRecipeDefault');
       this.$store.dispatch('setEditForm',true);
    }
  }
}

</script>

<style scoped>
.cookbook {
  margin: 1% 5%
}
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