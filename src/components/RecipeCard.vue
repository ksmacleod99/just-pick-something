<template>
    <router-link :to="`/recipes/${recipe.id}`">
        <div class="wrapper">
            <div class="image">
                <img :src="recipe.imageURL">
            </div>
            <div class="info">
                <h3> {{ recipe.name }} </h3>
                <p> {{recipe.meta[0].course}}</p>
                <p> {{recipe.meta[0].meal}}</p>
            </div>
    </div>
    
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

