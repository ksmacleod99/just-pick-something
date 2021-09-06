<!-- REMOVE PLAIN FORM ELEMENTS AS VUETIFY RELEASES UPDATES-->
<template>
  <v-layout justify-center>
    <v-dialog v-model="editForm" scrollable persistent>
     
        <v-card height="50vh" width="50vw" class="scroll">
        
          <v-card-title>
            <span class="headline">{{ editing ? 'Edit ' : 'Add ' }}Recipe</span>
          </v-card-title>
         
          <v-divider></v-divider>
         
          <v-card-text style="height: 700px;">
            <div class="container"> <!--v-container-->
              <form>
                  <!-- <v-text-field v-model="recipeModel.title" label="Title" outlined></v-text-field>-->
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
                  <div v-if="editor">
                    <v-btn outline @click="editor.chain().focus().toggleBulletList().run()" :class="{ 'is-active': editor.isActive('bulletList') }">
                      bullet list
                    </v-btn>
                    <v-btn outline @click="editor.chain().focus().toggleOrderedList().run()" :class="{ 'is-active': editor.isActive('orderedList') }">
                      ordered list
                    </v-btn>
                    </div>
                  <editor-content :editor="editor" class="editor" v-model="recipeModel.content" label="Steps" />
                </div>

                <div class="ingredients divMargin">
                  <div>
                    <h3 class="ingredients_list_label">Ingredients</h3>
                  <!-- <ul class="ingredients_list">
                      <li v-for="(item,index) in recipeModel.metadata.ingredients" :key="index">
                        {{ingredient.ingredient}} 
                        <v-btn fab dark small error @click="removeIngredient(index)" class="btn_remove_ingredient">
                          <v-icon dark>remove</v-icon>
                        </v-btn>
                      </li>
                    </ul> 
                  
                    <v-text-field ref="addIngredientRef" label="Ingredient" outlined></v-text-field> -->
                    <div class="ingredientsList" ref="addIngredientRef">
                      <label for="quantity">Quantity</label>
                      <input type="number" id="quantity" style="width:50px"/>
                      <label for="unit">Unit</label>
                        <select v-model="recipeModel.metadata.unit" label="unit" style="width:100px">
                            <option disabled value="">Please select one</option>
                            <option v-for="unit in unit" v-bind:key="unit in unit" :value="unit.value"> {{ unit.value }} </option>
                        </select>
                      <label for="ingredient">Ingredient</label>
                      <input type="text" id="ingredient" v-model="recipeModel.metadata.ingredients"/>
                    </div>

                  <v-btn color="#5ECC65" icon="mdi-plus" @click="addIngredient($refs.addIngredientRef)">
                    Add
                  </v-btn>
                </div>
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
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'

export default {
  name: "RecipeForm",
  components: {
    EditorContent,
  },
  data() {
    return {
      editor: null,
      meat:[
        {value: "Chicken"},
        {value: "Beef"},
        {value: "Pork"},
        {value: "Seafood"},
        {value: "Meatless"}
      ],
      course: [
        { value: "Main" },
        { value: "Side" },
        { value: "Vegetable" },
        { value: "Other" }
      ],
      unit: [
        {value: "oz"},
        {value: "cup"},
        {value: "package"},
        {value: "slice"}
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
  },

    mounted() {
      this.editor = new Editor({
        content: '<p>Add steps</p>',
        extensions: [
          StarterKit,
        ],
      })
    },

    beforeUnmount() {
      this.editor.destroy()
    },
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

.editor {
  border: solid 1px #314E55;
  border-radius: 2px;
  padding: 25px;
  margin: 5px;
}
.divMargin{
  margin-top: 1em;
}
.scroll {
  overflow: scroll;
}
</style>