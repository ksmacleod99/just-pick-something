<template>
    <router-link :to="`/recipes/${recipe.id}`">
        <v-card>
            <v-card-img>
                <v-img :src="recipe.metadata.image" />
            </v-card-img>
            <v-card-title> {{ recipe.title }} </v-card-title>
            <p> {{recipe.metadata.course}}</p>
            <p> {{recipe.metadata.meal.value}}</p>
            <p>Servings: {{ recipe.metadata.servings}} </p>
            <p> {{recipe.id}} </p>
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
</style>

