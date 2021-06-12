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
import { useStore } from 'vuex'
import { computed } from 'vue'
import RecipeCard from "../components/RecipeCard";


export default {
  name: 'Cookbook',
  components: {
    RecipeCard
  },
  setup() {
    const { state } = useStore()
    const isLoading = computed(() => state.cosmic.loading)
    const recipes = computed(() => state.cosmic.list)
    //return {recipes, isLoading}
    console.log(isLoading, recipes)
  },
  data() {
    return {
      //
    }
  },
  computed: {
    //
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