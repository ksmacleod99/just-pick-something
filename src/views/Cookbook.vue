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
        @open-edit="openEditForm"
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
      'editing',
      'editForm',
      'recipeModel'
    ]),

     success: {
          get: function(){
              return this.$store.state.status.success;
          },
          set: function(){ //value
              this.$store.dispatch('clearError');
          }
      },
      error: {
          get: function(){
              return this.$store.state.status.error;
          },
          set: function(){ //value
              this.$store.dispatch('clearError');
          }
      }, 

    },
  watch: {
    page: 'getRecipes'
  },
  methods: {
    openAddForm(){
       this.$store.dispatch('setRecipeDefault');
       this.$store.dispatch('setEditForm',true);
      console.log("Add form clicked")
    },
    openEditForm(recipe){
      this.$store.dispatch('editRecipe',recipe);
      this.$store.dispatch('toggleEditing');
      this.$store.dispatch('setEditForm',true);
      console.log("edit clicked");
    },
    deleteRecipe(recipe){
        this.$store.dispatch('deleteRecipe',recipe);
    },
    recipes() {
        return this.$store.getters.recipes
    },
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
  justify-content: space-between;
  padding: .25em;
  margin: .25em;

}
.top {
  margin: 1em;
  padding: 10px;
}
</style>