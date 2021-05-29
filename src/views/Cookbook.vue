<template>

    <div class="container">
          <RecipeCard
              v-for="recipe in recipes"
              :recipe="recipe"
              :key="recipe.id"
          />
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
    };
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
};
</script>

<style scoped>
.container {
  display: flex;
  flex-flow: row wrap;
  padding: .25em;
  margin: .25em;

}
</style>