<template>
    <div class="container">
        <form @submit="onSubmit">
        <div class="masthead">
            <div class="image">
               <!--<img :src="recipe.metadata.image"/>-->
            </div>
            <contenteditable tag="h2" :contenteditable="editing" v-model="recipe.name" v-bind:class="{ editing:editing}"> {{recipe.title}}</contenteditable>
        </div> 

       <!-- <div class="meta">
            <div class="metabox" >
                <p>Meal: <span :contenteditable="editing" v-bind:class="{ editing:editing}"> {{recipe.metadata.meal.value}} </span></p>
                <p>Meat: <span :contenteditable="editing" v-bind:class="{ editing:editing}"> {{recipe.metadata.meat}} </span></p>
                <p>Course: <span :contenteditable="editing" v-bind:class="{ editing:editing}"> {{recipe.metadata.course}} </span> </p>
            </div>
            <div class="metabox">
                <p>Spicy: {{ recipe.metadata.spicy }}</p>
                <p>Rating: {{ recipe.metadata.rating }}</p>
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
        </div> -->

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
        </form>
    </div>

</template>

<script>
import bucket from '@/plugins/cosmic.js'
//import EditButton from "../components/EditButton";
import contenteditable from 'vue-contenteditable';

export default {
    name: "Recipe",
    components: {
       // EditButton,
        contenteditable
    },
    data() {
        return {
            recipe: Object,
            editing: false,
            loading: false,
        }
    },
    methods: {
        getRecipe() {
           return bucket.getObject({ 
                id:this.$route.params.id,
            })/*.then(data => {
                const recipe = data.objects
                this.recipe = recipe
            })*/
        
        }
    },
        created() {
        this.recipe = this.getRecipe()
        console.log(this.recipe.response)

    },

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