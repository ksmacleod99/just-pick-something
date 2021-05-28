<template>
    <div class="container">
        <div class="masthead">
            <div class="image">
               <img :src="recipe.imageURL"/>
            </div>
            <h2> {{ recipe.name }} </h2>
        </div>  
        <div class="meta">
            <div class="metabox">
                <p>Meal: {{ recipe.meta[0].meal }}</p>
                <p>Meat: {{ recipe.meta[0].meat}}</p>
                <p>Course: {{ recipe.meta[0].course }} </p>
            </div>
            <div class="metabox">
                <p>Spicy: {{ recipe.meta[0].spicy }}</p>
                <p>Rating: {{ recipe.meta[0].rating }}</p>
                <p>Calories:</p>
            </div>
           <div class="metabox">
               <EditButton /> 

                <p>Add To Plan</p>
           </div>


        </div>
        <div class="ingredients">
            <ul>
                <li v-for="ingredient in recipe.ingredients" :key="ingredient"> {{ ingredient.quantity }} {{ ingredient.name }} </li>
            </ul>
        </div>
        <div class="steps">
            <ol>
                <li v-for="step in recipe.steps" :key="step"> {{ step }} </li>
            </ol>
        </div>
    </div>

</template>

<script>
import EditButton from "../components/EditButton";

export default {
    name: "Recipe",
    components: {
        EditButton
    },
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
        },
        /* getIngredients(){
            const ingredients = this.recipe.id;

            console.log(this.recipe.id + ingredients)
            // for ( var key of ingredients )
        } */
    },
      async created() {
        this.recipe = await this.getRecipe();
    }, 
}
</script>

<style scoped>
    h2 {
        text-align: center;
    }
    .container {
        margin: auto;
        padding: 1em; 
        max-width: 70%;
    }
    .masthead, .ingredients, .steps {
        border: 1px lightgray solid;
        width: 100%;
        padding: 1em;
    }
    .meta {
        width: 100%;
        display: flex;
    }
    .metabox {
        padding: 1em;
        border: 1px solid lightgray;
        flex-grow: 1;
    }
    .image {
        border-radius: 50%;
        overflow:hidden;
        width: 200px;
        height: 200px;
        margin: auto;
        padding: auto;
    }
</style>