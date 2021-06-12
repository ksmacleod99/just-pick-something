<template>
    <div class="container">
        <form>
        <div class="masthead">
            <label for="name">Recipe Name: </label>
            <input type="text" id="name" v-model.trim="name">
            <label for="imageUrl"> Image URL: </label>
            <input type="text" id="imageURL" v-model.trim="imageURL">
            <label for="original">Original URL: </label>
            <input type="text" id="originalUrl" v-model.trim="originalURL">
        </div> 

        <div class="meta">
            <div class="metabox" >

                <label for="meal">Meal: </label>
                  <select v-model="meal">
                        <option disabled value="">Please select one</option>
                        <option>Breakfast</option>
                        <option>Lunch</option>
                        <option>Dinner</option>
                        <option>Other</option>
                    </select>
                <p>Meat: </p>
                    <label for="beef">Beef</label>
                    <input value="Beef" type="radio" v-model="meat">
                    <label for="chicken">Chicken</label>
                    <input value="Chicken" type="radio" v-model="meat">
                    <label for="fish">Fish</label>
                    <input value="Fish" type="radio" v-model="meat">
                    <label for="meatless">Meatless</label>
                    <input value="Meatless" type="radio" v-model="meat">
                <p>Course:</p>
                    <label for="main">Main</label>
                    <input value="Main" type="radio" v-model="course">
                    <label for="side">Side</label>
                    <input value="Side" type="radio" v-model="course">
                    <label for="veg">Vegitable</label>
                    <input value="veg" type="radio" v-model="course">
                    <label for="starter">Starter</label>
                    <input value="starter" type="radio" v-model="course">
            </div>
            <div class="metabox">
                <label for="spicy">Spicyness: </label>
                  <select v-model="spicy">
                        <option value="">0</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                    </select>
                    <p/>
                <label for="rating">Rating: </label>
                  <select v-model="rating">
                        <option value="">0</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>4</option>
                    </select>
                <p>Calories:</p>
            </div>
           <div class="metabox">
            <v-btn
                class="ma-2"
                color="#5ECC65"
                @click="saveEdit"
            >
                Save
                <v-icon dense right >mdi-content-save</v-icon>
            </v-btn>
                <p>Add To Plan</p>
           </div>

        </div>
        <div class="ingredients">
            <v-btn
                icon="mdi-plus"
                color="#5ECC65"
                @click="AddIngredient()"
            ></v-btn>
            Add Ingredient
            <div>
                <div v-for="index in count" :key="index" @remove="ing.splice(index, 1)">
                    <AddIngredient />
                </div>
            </div>

            
        </div>
    </form>    
</div>

</template>

<script>
import AddIngredient from "../components/AddIngredient"

export default {
    name: "AddRecipe",
    components: {
        AddIngredient
    },
    data() {
        return {
          count: 3
        }
    },
    methods: {
        AddIngredient(){
            this.count.push({
            id: this.count++,
        })
            console.log(this.count)
        }
       
       
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
    input {
        border: 1px solid #314E55;
    }
    select {
        border: 1px solid #314e55;
    }
</style>