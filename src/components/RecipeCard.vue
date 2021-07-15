<template>
    <router-link :to="`/recipes/${recipe.id}`">
        <v-card>
            <v-img :src="recipe.metadata.image.value">
                <v-card-title> {{ recipe.title }} </v-card-title>
            </v-img>
            <div class="chips">
                <v-chip 
                    color="#314E55"
                    variant="outlined"> 
                        {{recipe.metadata.meal.value}} 
                    </v-chip>
                <v-chip color="#314E55" variant="outlined"> {{recipe.metadata.meat}} </v-chip> 
            </div>
            <v-card-text>
                <p>Servings: {{ recipe.metadata.servings}} </p>
                <p> Calories: </p>
            </v-card-text>
            <v-card-actions>
                <v-btn text color="#5ECC65">Add To Plan</v-btn>
                <v-btn text color="#314E55">Edit</v-btn>
            </v-card-actions>
        </v-card>
    
    </router-link>

</template>

<script>
export default {
    name: "RecipeCard",
    props: {
        recipe: Object
    },
}
</script>

<style scoped>
    .wrapper {
        margin: 1em;
        padding: 0;
        width:300px;
        background: white;
        filter: drop-shadow(5px 5px 1px gray);
    }
    .info {
        padding: 10px;
        margin:0;
    }
    .image {
        max-height: 90%;
    }
    img {
    max-width: 100%;
    }
    .chips > * {
        margin: 5px;
    }
    a {
        text-decoration: none;
    }
</style>

