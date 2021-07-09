<template>
    <div class="container">
     <form @submit="onSubmit">
        <div class="masthead">
            <div class="image">
               <img :src=getRecipe.metadata.image.value />
            </div>
            <contenteditable tag="h2" :contenteditable="editing" v-model="recipe.name" v-bind:class="{ editing:editing}"> {{getRecipe.title}}</contenteditable>
        </div> 

       <div class="meta">
            <div class="metabox" >
                <p>Meal: <span :contenteditable="editing" v-bind:class="{ editing:editing}"> {{getRecipe.metadata.meal.value}} </span></p>
                <p>Meat: <span :contenteditable="editing" v-bind:class="{ editing:editing}"> {{getRecipe.metadata.meat}} </span></p>
                <p>Course: <span :contenteditable="editing" v-bind:class="{ editing:editing}"> {{getRecipe.metadata.course}} </span> </p>
                <p>Servings: <span :contenteditable="editing" v-bind:class="{ editing:editing}"> {{getRecipe.metadata.servings}} </span> </p>
            </div>
            <div class="metabox">
                <p>Spicy: {{ getRecipe.metadata.spicy.value }}</p>
                <p>Rating: {{ getRecipe.metadata.rating.value }}</p>
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
                <v-icon dense right >mdi-content-save</v-icon>
            </v-btn>
                <p>Add To Plan</p>
           </div>
        </div> 

        <div class="ingredients">
            <ul>
                <li v-for="ingredient in getRecipe.metadata.ingredients" :key="ingredient"> {{ ingredient.quantity }} {{ ingredient.unit }} {{ ingredient.ingredient }} </li>
            </ul>
        </div>
        <div class="steps">
            {{getRecipe.content}}
        </div>
        </form> 
    </div>

</template>


<script>
//import EditButton from "../components/EditButton";
//import contenteditable from 'vue-contenteditable';
import { mapGetters } from 'vuex'

export default {
    name: "Recipe",
    components: {
       // EditButton,
        //contenteditable
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
      'getRecipe'
    ]),
        getRecipe(){
            return this.$store.getters.getRecipe;
        },
       
    }, 
  }

      /*  startEdit(e) {
            e.preventDefault()
            this.editing = !this.editing //makes the elements inside of cntenteditable components editable
            console.log("can edit")
        },
        async saveEdit(e) {
            e.preventDefault()
            this.editing = !this.editing // makes the elements inside of contenteditable components readonly
            let id = this.$route.params.id;
            let recipe = this.recipe
            const updRecipe = {
                name: recipe.name
                }
           console.log(updRecipe);

                      const data = await res.json()

            this.recipe = this.recipe.map((recipe) =>
            recipe.id === id ? { ...recipe, name: data.name } : recipe
           // if recipe.id equals the id above, then , else recipe
            ) 
            console.log("edit done")
        } */

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
    .ingredients, .steps {
        border: 1px lightgray solid;
        width: 100%;
        padding: 10px;
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
</style>