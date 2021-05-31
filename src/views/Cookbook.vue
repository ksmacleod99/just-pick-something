<template>
  <div>
    <div class="top">
      <router-link to="/add_recipe">
        <v-btn
          class="ma-2"
          color="#5ECC65"
        >
        Add Recipe
        <v-icon dense right>mdi-plus</v-icon>
      </v-btn>
      </router-link>
    </div>

    <div class="container">
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
export default {
  name: 'Cookbook',
  components: {
    RecipeCard
  },
  data() {
    return {
      recipes: []
    }
  },
  methods: {
      async fetchRecipeList() {
      const res = await fetch("api/recipes");
      const recipes = await res.json();
      return recipes;
    },
  },
  async created() {
    this.recipes = await this.fetchRecipeList();
  }
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