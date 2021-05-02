<template>
    <div class="container" :recipe="recipe">
        <div class="masthead">
            <h1>hello</h1>
            <h2> {{ recipe.name }} </h2>
        </div>  
        <div class="meta">
            <p>Meal: {{ recipe.meta[0].meal }}</p>
            <p>Meat: {{ recipe.meta[0].meat}}</p>
            <p> test </p>
        </div>
    </div>
</template>

<script>
export default {
    name: "Recipe",
    data() {
        return {
            recipe: {},
        }
    },
    methods: {

        async getRecipe() {
            let id = this.$route.params.id;
           const res = await fetch(`/api/recipes/${id}`);
            const recipe = await res.json();
            return recipe;
        }
    },
      async created() {
        this.recipe = await this.getRecipe();
    }, 
}
</script>

<style scoped>
    .container {
        margin: 1em;
        border: 1px red solid;
        padding: 1em; 
    }
</style>