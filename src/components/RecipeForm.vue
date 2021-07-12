<template>
  <v-layout row justify-center>
    <v-dialog v-model="editForm" scrollable persistent width="50vw">
        <v-card>
          <v-card-title>
            <span class="headline">{{ editting ? 'Edit ' : 'Add ' }}Recipe</span>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text style="height: 70vh;">
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field v-model="recipeModel.title" label="Title" :error-messages="errors.collect('title')" v-validate="'required'" data-vv-name="title" required></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <div class="input-group input-group--dirty">
                    <label>Content</label>
                    <wysiwyg v-model="recipeModel.content" />
                  </div>
                </v-flex>
                <v-flex xs12 class="mb-2">
                  <div class="input-group input-group--dirty">
                    <label class="ingredients_list_label">Ingredients</label>
                    <ul class="ingredients_list">
                      <li v-for="(item,index) in recipeModel.metadata.ingredients" :key="index">
                        {{ingredient.ingredient}}
                        <v-btn fab dark small error @click="removeIngrediant(index)" class="btn_remove_ingredient">
                          <v-icon dark>remove</v-icon>
                        </v-btn>
                      </li>
                    </ul>
                  </div>
                </v-flex>
                <v-flex xs10 class="mb-3">
                  <v-text-field ref="addIngredientRef" label="Ingredient"></v-text-field>
                </v-flex>
                <v-flex xs2 class="mb-3">
                  <v-btn warning fab small dark @click="addIngrediant($refs.addIngredientRef)">
                    <v-icon>add</v-icon>
                  </v-btn>
                </v-flex>
                <v-flex xs12>
                    <v-radio-group v-model="recipeModel.metadata.meal">
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
                  </v-flex>
                <v-flex xs12>
                  <v-select v-model="recipeModel.metadata.meat" label="Meat" :meats="meats" error-messages="errors.collect('meat')" v-validate="'required'" data-vv-name="meat" required></v-select>
                </v-flex>
                <v-flex xs12>
                  <v-select v-model="recipeModel.metadata.course" label="Course" :course="course" :error-messages="errors.collect('course')" v-validate="'required'" data-vv-name="course" required></v-select>
                </v-flex>
                <v-flex xs12>
                  <v-text-field v-model="recipeModel.metadata.servings" label="Servings (person)" :error-messages="errors.collect('servings')" v-validate="'required|numeric'" data-vv-name="servings" required></v-text-field>
                </v-flex>
                <v-flex xs12>
                <v-text-field v-model="recipeModel.metadata.found" label="Found" :error-messages="errors.collect('found')" v-validate="'required'" data-vv-name="found" required></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <img class="upload_image" :src="recipeModel.metadata.feature_image.url.replace(/ /g,'%20')" v-if="!!recipeModel.metadata.feature_image.url" />
                  <form enctype="multipart/form-data" novalidate>
                    <input type="file" @change="onFileChange" accept="image/*" data-vv-name="image" v-validate="'required|mimes:image/*'" required />
                    <div class="input-group fileUploadError">
                      <div class="input-group__error" v-show="errors.has('image') && !editting">
                        {{ errors.first('image') }}
                      </div>
                    </div>
                  </form>
                </v-flex>
              </v-layout>
            </v-container>
            <small>*indicates required field</small>
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
        {meat: "Chicken"},
        {meat: "Beef"},
        {meat: "Pork"},
        {meat: "Seafood"},
        {meat: "Meatless"}
      ]
    }
  },
  computed: {
    ...mapGetters([
      'editForm', 'recipeModel','editting','loading'
    ])
  },
  methods: {
    closeDialog() {
      this.$validator.reset();
      this.$store.dispatch('setRecipeDefault');
      this.$store.dispatch('setEditForm', false);
    },
    saveRecipe(recipe) {
      this.$validator.validateAll();
      if(this.$store.state.editting){
        if( (!this.errors.any()) || (this.errors.count() == 1 && this.errors.has('image'))) {
          this.$store.dispatch('editRecipe', recipe);
        }
      }
      else
      {
        if(!this.errors.any()){
          this.$store.dispatch('addRecipe', recipe);
        }
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