<template>
  <div>
    <div class="top">
      <router-link to="/add_recipe">
        <v-btn
          class="ma-2"
          color="#5ECC65"
        >
        Add Recipe
        <v-icon small dense right>mdi-plus</v-icon>
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
import bucket from '@/plugins/cosmic.js'
export default {
  name: 'Cookbook',
  data(){
    return {
      loading: false,
      recipes: [],    
      }
  },
  components: {
    RecipeCard
  },
  async created() {
    this.fetchData()
  },
  methods: {
    fetchData () {
      this.error = this.recipe = null
      this.loading = true
      bucket.getObjects({
        query: {
          type: 'recipes'
        },
         props: 'slug,title,content,metadata,id' // Limit the API response data by props
         }).then(data => {
        const recipes = data.objects
        this.loading = false
        this.recipes = recipes
      })
    }
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