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
//import { ref, computed} from 'vue'
import { mapState } from 'vuex'
import RecipeCard from "../components/RecipeCard";

export default {
  name: 'Cookbook',
 /* props: {
    recipes: [],
  },*/
  components: {
    RecipeCard
  },
  computed: mapState({
    recipes: state => state.recipes.all
    })
 /* setup(){
    const allRecipes = ref(null)
    const store = useStore()
    const recipes = computed(() => store.state.recipes.all)

    return {
      allRecipes,
      recipes
    }
  } */
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