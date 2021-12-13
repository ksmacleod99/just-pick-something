<!-- REMOVE PLAIN FORM ELEMENTS AS VUETIFY RELEASES UPDATES-->
<template>
<v-layout>
  <v-dialog v-model="editForm" scrollable persistent max-width="50vw">
      <v-card style="width: 80vw">         
          <v-card-title>
            <span class="headline">{{ editing ? 'Edit ' : 'Add ' }}Recipe</span>
          </v-card-title>
         
          <v-divider></v-divider>
         
          <v-card-text style="height: 400px; overflow: scroll;">
            <v-form>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="8"
                  >
                    <v-text-field v-model="recipeModel.title" label="Title" outline></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col
                    cols="12"
                    sm="12"
                    md="6"
                  >
                    <p>Meal</p>
                    <v-radio-group row v-model="recipeModel.metadata.meal">
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
                    </v-radio-group>
                  </v-col>
                </v-row>
            
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  > 
                    <v-select v-model="recipeModel.metadata.meat" label="Meat" :meat="meat" outlined></v-select>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  > 
                  <v-select v-model="recipeModel.metadata.course" label="Course" :course="course" outlined></v-select>
                  </v-col>
                </v-row>


                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  > 
                    <v-text-field v-model="recipeModel.metadata.servings" label="Servings (person)" outlined></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="8"
                  > 
                    <v-text-field v-model="recipeModel.metadata.found" label="Found http://" outlined></v-text-field>
                  </v-col>
                </v-row>

<!--
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
                  </v-flex>

-->
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

                <div class="divMargin">
                  <h3>Ingredients*</h3>
                    <div>
                      <v-row>
                        <v-col
                        cols="12"
                        sm="3"
                        md="3"
                        >
                          <v-text-field v-model="recipeModel.metadata.ingredients.ingredient" label="Ingredient name" outlined></v-text-field>
                        </v-col>

                        <v-col
                        cols="12"
                        sm="1"
                        md="1"
                        >
                          <v-text-field v-model="recipeModel.metadata.ingredients.quantity" label="Amt" outlined></v-text-field>
                        </v-col>

                        <v-col
                          cols="12"
                          sm="2"
                          md="2"
                        >
                          <v-select v-model="recipeModel.metadata.ingredients.unit" label="unit" outlined></v-select>
                        </v-col>
                      </v-row>
                    </div>                   
                </div>
            
               <small>*indicates required field</small>
              </v-container>
            </v-form>
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
      meat:[ "Chicken", "Beef", "Pork", "Seafood", "Meatless"],
      course: ["Main", "Side", "Vegetable", "Other"],
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

.editor {
  border: solid 1px #314E55;
  border-radius: 2px;
  padding: 25px;
  margin: 5px;
}
.divMargin{
  margin-top: 1em;
}

</style>