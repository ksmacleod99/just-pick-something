<template>
    <div class="container">
        <div class="masthead">
            <h2> {{ recipe.name }} </h2>
        </div>  
        <div class="meta">
            <p>Meal: {{ recipe.meta[0].meal }}</p>
            <p>Meat: {{ recipe.meta[0].meat}}</p>
            <p>Course: {{ recipe.meta[0].course }} </p>
            <p>Spicy: {{ recipe.meta[0].spicy }}</p>
            <p>Raiting: {{ recipe.meta[0].rating }}</p>
        </div>
        <div class="ingredients">
            <ul>
                <li :for="value in recipe.ingredients"> {{index}} {{ quantity }} {{ name }} </li>
            </ul>
        </div>
        <div class="steps">
            <ol>
                <li :for="step in recipe.steps" :key="recipe.step"> {{ recipe.step }} </li>
            </ol>
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