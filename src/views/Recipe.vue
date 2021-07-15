<template>
    <div class="container">
     <form @submit="onSubmit">
        <div class="masthead">
           <!-- <div class="image">
               <img :src="getRecipe.metadata.image.value" />
            </div> -->
            <h2> {{getRecipe.title}}</h2>
        </div> 

       <div class="meta">
            <div class="metabox">
                <div class="chips">
                    <v-chip 
                        color="#314E55"
                        text-color="white"> 
                            {{getRecipe.metadata.meal.value}} 
                        </v-chip>
                    <v-chip color="#314E55" variant="outlined"> {{getRecipe.metadata.meat}} </v-chip> 
                    <v-chip color="#314E55" variant="outlined">{{getRecipe.metadata.course}}</v-chip> 

                </div>
                <p>Servings: {{getRecipe.metadata.servings}} </p>
                <p>Spicy:{{ getRecipe.metadata.spicy.value }} </p>
                <p>Rating: 
                    <v-rating
                        empty-icon="mdi-star-outline"
                        full-icon="mdi-star"
                        half-icon="mdi-star-half-full"
                        v-model="rating"
                        color="#314E55"
                        size="20"
                        hover
                        length="5">
                             {{ getRecipe.metadata.rating.value }}
                    </v-rating>
                </p>
                <p>Calories:</p>
            </div>
           <div class="metabox">
               <EditButton @click="startEdit" v-if="!editing"/> 
            <v-btn
                class="ma-2"
                color="#5ECC65"
                @click="saveEdit"
                v-if="editing"
            >
                Save
                <v-icon right >mdi-content-save</v-icon>
            </v-btn>
                <p>Add To Plan</p>
           </div>
        </div> 

        <div>
            <div class="strike">
                <span>Ingredients</span>
            </div>
            <ul class="ingredients">
                <li v-for="ingredient in getRecipe.metadata.ingredients" :key="ingredient"> {{ ingredient.quantity }} {{ ingredient.unit }} {{ ingredient.ingredient }} </li>
            </ul>
        </div>
        <div>
            <div class="strike">
                <span>Steps</span>
            </div>
            {{getRecipe.content}}
        </div>
        </form> 
    </div>
    <RecipeForm />

</template>


<script>
import EditButton from "../components/EditButton";
import RecipeForm from "../components/RecipeForm";
import { mapGetters } from 'vuex'

export default {
    name: "Recipe",
    components: {
        EditButton,
        RecipeForm

    },
    props: [ 'id' ],
    data() {
        return {
            recipe:{},
        }
    },
    created(){
        this.$store.dispatch('fetchRecipe', {id: this.$route.params.id})     
    },
    computed: {
    ...mapGetters([
      'loading',
      'getRecipe',
      'editing',
      'editForm',
      'recipeModel',
      'loading'
    ]),
        getRecipe(){
            return this.$store.getters.getRecipe;
        },
       
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
    .masthead {
        border: 1px lightgray solid;
        width: 100%;
        padding: 1em;
    }
    .ingredients {
        list-style: none;
    }
    ol, ul{
        width: 100%;
        margin: 5px;
        padding: 10px;
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
    .editing {
        border-bottom: 1px solid #314E55;
    }
     .strike {
        display: block;
        text-align: center;
        overflow: hidden;
        white-space: nowrap; 
    }

    .strike > span {
        position: relative;
        display: inline-block;
    }
	
    .strike > span:before,
    .strike > span:after {
        content: "";
        position: absolute;
        top: 50%;
        width: 1000px;
        height: 1px;
        background: #314E55;
    }

     .strike > span:before {
        right: 100%;
        margin-right: 15px;
    }

    .strike > span:after {
        left: 100%;
        margin-left: 15px;
    }
    .chips > * {
        margin: 5px;
    }
</style>