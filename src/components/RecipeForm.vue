<!-- REMOVE PLAIN FORM ELEMENTS AS VUETIFY RELEASES UPDATES-->
<template>
  <v-layout justify-center>
    <v-dialog v-model="editForm" scrollable persistent width="100vw">
     
        <v-card width="50vw">
        
          <v-card-title>
            <span class="headline">{{ editing ? 'Edit ' : 'Add ' }}Recipe</span>
          </v-card-title>
         
          <v-divider></v-divider>
         
          <v-card-text style="height: 50vh;">
            <div class="container"> <!--v-container-->
            <form>
                  <!--<v-text-field v-model="recipeModel.title" label="Title" outlined></v-text-field>-->
              <div class="title divMargin">
                    <h3>Title</h3>
                    <input type="text" v-model.trim="recipeModel.title" label="Title">
              </div>

              <div class="meal divMargin">
                <h3>Meal</h3>
                <div class="radio">
                  <label for="breakfast">Breakfast</label>
                  <input type="radio" v-model="recipeModel.metadata.meal" id="breakfast" value="breakfast" class="radio">
                  <label for="lunch">Lunch</label>
                  <input type="radio" v-model="recipeModel.metadata.meal" id="lunch" value="lunch" class="radio">
                  <label for="dinner">Dinner</label>
                  <input type="radio" v-model="recipeModel.metadata.meal" id="dinner" value="dinner" class="radio">
                  <label for="other">Other</label>
                  <input type="radio" v-model="recipeModel.metadata.meal" id="other" value="other" class="radio">
                </div>
                    <!-- <v-radio-group v-model="recipeModel.metadata.meal">
                         <v-radio
                            label="Breakfast"
                            value="breakfast"
                        ></v-radio>
                        <v-radio
                            label="Lunch"
                            value="lunch"
                        ></v-radio>
                        <v-radio
                            label="Dinner"
                            value="dinner"
                        ></v-radio>
                        <v-radio
                            label="Other"
                            value="other"
                        ></v-radio> 
                        </v-radio-group> -->

              </div>     

              <div class="wrapper divMargin">
                <div>
                  <!--<v-select v-model="recipeModel.metadata.meat" label="Meat" :meats="meats" outlined></v-select> -->
                  <h3>Meat:</h3>
                  <select v-model="recipeModel.metadata.meat" label="Meat" style="width:200px">
                     <option disabled value="">Please select one</option>
                    <option v-for="meat in meat" v-bind:key="meat in meat" :value="meat.value"> {{ meat.value }} </option>
                  </select>
                </div>
                <div>
                  <h3>Course:</h3>
                  <select v-model="recipeModel.metadata.course" label="Course" style="width:200px">
                    <option disabled value="">Please select one</option>
                    <option v-for="course in course" v-bind:key="course in course" :value="course.value"> {{ course.value }} </option>
                  </select>
                  <!--<v-select v-model="recipeModel.metadata.course" label="Course" :course="course" outlined></v-select>-->
                </div>
                <div>
                  <h3>Servings:</h3>
                  <input v-model.trim="recipeModel.metadata.servings" type="number" style="width:50px" />
                 <!-- <v-text-field v-model="recipeModel.metadata.servings" label="Servings (person)" outlined></v-text-field>-->
                </div>
              </div>

              <div class="links divMargin">
                <h3>Found at:</h3>
                <input v-model="recipeModel.metadata.found" type="text" width="300px" />
               <!-- <v-text-field v-model="recipeModel.metadata.found" label="Found" outlined></v-text-field>
                 <v-flex xs12>
                  <img class="upload_image" :src="recipeModel.metadata.feature_image.url.replace(/ /g,'%20')" v-if="!!recipeModel.metadata.feature_image.url" />
                  <form enctype="multipart/form-data" novalidate>
                    <input type="file" @change="onFileChange" accept="image/*"  required />
                    <div class="input-group fileUploadError">
                      <div class="input-group__error" v-show="errors.has('image') && !editing">
                        {{ errors.first('image') }}
                      </div>
                    </div>
                  </form>
                </v-flex> -->
              </div>

              <div class="steps divMargin">
                <h3>Steps</h3>
                <textarea v-model="recipeModel.content" label="Steps"></textarea>
                <!--<wysiwyg v-model="recipeModel.content" /> -->
              </div>

              <div class="ingredients divMargin">
                <div>
                  <h3 class="ingredients_list_label">Ingredients</h3>
                  <ul class="ingredients_list">
                    <li v-for="(item,index) in recipeModel.metadata.ingredients" :key="index">
                      {{ingredient.ingredient}}
                      <v-btn fab dark small error @click="removeIngredient(index)" class="btn_remove_ingredient">
                        <v-icon dark>remove</v-icon>
                      </v-btn>
                    </li>
                  </ul>
                </div>
              <v-text-field ref="addIngredientRef" label="Ingredient" outlined></v-text-field>
              <v-btn warning fab small dark @click="addIngredient($refs.addIngredientRef)">
                <v-icon>add</v-icon>
              </v-btn>
            </div>
          </form>
            <small>*indicates required field</small>
          </div>             
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn error dark @click="closeDialog" :disabled="loading">Close</v-btn>
            <v-btn :loading="loading" :disabled="loading" primary dark @click="saveRecipe(recipeModel)">Save</v-btn>
          </v-card-actions>

        </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'; //mapActions
export default {
  name: "RecipeForm",
  data() {
    return {
      meat:[
        {value: "Chicken"},
        {value: "Beef"},
        {value: "Pork"},
        {value: "Seafood"},
        {value: "Meatless"}
      ],
      course: [
        { value: "Breakfast" },
        { value: "Lunch" },
        { value: "Dinner" },
        { value: "Other" }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'editForm', 'recipeModel','editing','loading'
    ])
  },
  methods: {
    closeDialog() {
      this.$store.dispatch('setRecipeDefault');
      this.$store.dispatch('setEditForm', false);
    },
    saveRecipe(recipe) {
      this.$validator.validateAll();
      if(this.$store.state.editing){  //if state is in 'edit,' use the edit setters
          this.$store.dispatch('editRecipe', recipe);
      } else { //else use the 'add' setters
          this.$store.dispatch('addRecipe', recipe);
      }
    },
    addIngrediant(item){
      if(item.$refs.input.value){
        this.$store.dispatch('addIngrediantInRecipe', item.$refs.input.value);
      }
    },
    removeIngrediant(id){
      this.$store.dispatch('removeIngrediantInRecipe', id);
    },
    onFileChange(e){
        var files = e.target.files || e.dataTransfer.files;
        if (!files.length){
          this.$store.dispatch('setRecipeImage', '');
          this.$store.dispatch('setRecipeFile', '');
          return;
        }
        //var image = new Image();
        var reader = new FileReader();
        reader.onload = (e) => {
          this.$store.dispatch('setRecipeImage', e.target.result);
          this.$store.dispatch('setRecipeFile', files[0]);
        };
        reader.readAsDataURL(files[0]);
    }
  }
}
</script>

<style scoped>
.wrapper {
  display: flex;
  justify-content: space-between;
}
.radio {
  margin-right: 15px;
}

label {
  margin-right: 2px;
}

input, textarea, select{
  border: solid 1px #314E55;
  border-radius: 2px;
  padding: 5px;
}
.divMargin{
  margin-top: 1em;
}
</style>