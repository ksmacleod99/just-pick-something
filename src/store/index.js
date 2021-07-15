import { createLogger, createStore } from 'vuex'
import _ from 'lodash'
import bucket from '@/plugins/cosmic'

export default createStore({
   plugins: [createLogger()],
   state:{ 
      //Initial State of the app
      drawer: false,
      currentRecipe: {},
      status:{
         loading: false,
         success: false,
         error: false
      },
      recipes: [],
      plans: [],
      editForm: false,
      editing: false
   },

   getters: {
      menu: state => {return state.menu},
      recipes: state => {return state.recipes}, //all recipes
      getRecipe: state => {return state.currentRecipe}, //single recipe
      loading: state => {return state.status.loading},
      editForm: state => {return state.editForm}, //add and edit form
      recipeModel: state => {return state.recipe},
      editing: state => {return state.editing}
   },

   actions: { //this is where we pull in CosmicJS stuff
      initCosmic: ({commit}) => { //get all recipes
         commit('LOADING')
         return bucket.getObjects().then(data => {
            //set recipes state
            let recipes = data.objects
            commit('SET_Recipes', recipes)

         //set status to SUCCESS
         commit('SUCCESS')
         }).catch(err =>{
            //status error
            commit('ERROR', err)
         })
      },
      fetchRecipe: ({commit}, {id}) =>{ //get a single recipe based on id
         commit('LOADING')
         return bucket.getObject({
            id:id
         }).then(data => {
            //console.log(data.object.id)
            let currentRecipe = data.object
            commit('SET_RECIPE', currentRecipe)
            
         //set status to SUCCESS
         commit('SUCCESS')
         }).catch(err =>{
            //status error
            commit('ERROR', err)
         })
      },
      addRecipe(context,payload){
         context.commit('LOADING');
         Request.addRecipe(payload).then(recipe => {
             context.commit('ADD_RECIPE',recipe);
             context.commit('SET_RECIPE_DEFAULT');
             context.commit('TOGGLE_EDITFORM',false);
             context.commit('SUCCESS');
         })
         .catch(e => {
             context.commit('ERROR',e);
         });
     },
     editRecipe(context,payload){
         context.commit('LOADING');
         Request.editRecipe(payload).then(recipe => {
             context.commit('EDIT_RECIPE',recipe);
             context.commit('SET_RECIPE_DEFAULT');
             context.commit('TOGGLE_EDITING');
             context.commit('TOGGLE_EDITFORM',false);
             context.commit('SUCCESS');
         })
         .catch(e => {
             context.commit('ERROR',e);
         });
     },
     deleteRecipe(context,payload){
         context.commit('LOADING');
         Request.deleteRecipe(payload).then((res) => {
             if(res.status == 200){
                 context.commit('DELETE_RECIPE',payload);
                 context.commit('SUCCESS');
             }
             else{
                 context.commit('ERROR',res);
             }
         })
         .then((e) => {
             context.commit('ERROR',e);
         });
     },
     setEditForm(context,payload){
      context.commit('TOGGLE_EDITFORM',payload);
      },
      addIngrediantInRecipe(context,payload){
            context.commit('ADD_INGREDIANT_RECIPE',payload);
      },
      removeIngrediantInRecipe(context,payload){
            context.commit('REMOVE_INGREDIANT_RECIPE',payload);
      },
      setRecipeImage(context,payload){
            context.commit('SET_RECIPE_IMAGE',payload);
      },
      setRecipeFile(context,payload){
            context.commit('SET_RECIPE_FILE',payload);
      },
      toggleEditing(context){
            context.commit('TOGGLE_EDITING');
      },
      setRecipeDefault(context){
         context.commit('SET_RECIPE_DEFAULT');
     },
   },
   mutations: { //change the state in the store
      SET_Cosmic: (state, payload) => { state.cosmicDB = payload },
      SET_Recipes: (state, payload) => { state.recipes = payload},
      ADD_RECIPE: (state,payload)=> { state.recipes.unshift(payload)},
      EDIT_RECIPE: (state, payload) => { state.recipes = _.unionBy([payload], state.recipes,'_id')},
      setDrawer: (state, payload) => { state.drawer = payload },
      SET_RECIPE: (state, payload) => {state.currentRecipe = payload},
      LOADING: (state) => {
         state.status = {
           loading: true,
           success: false,
           error: false
         }
       },
       SUCCESS: (state) => {
         state.status = {
           loading: false,
           success: true,
           error: false
         }
       },
       ERROR: (state, payload) => {
         state.status = {
           loading: false,
           success: false,
           error: payload
         }
       },
       CLEAR_ERROR: (state) => {
         state.status = {
           loading: false,
           success: false,
           error: false
         }
       },
      TOGGLE_EDITFORM(state,payload){
         state.editForm = payload;
      },
      ADD_INGREDIANT_RECIPE(state,payload){
            state.recipe.metadata.ingredients.push({
               ingredient: payload
            });
      },
      REMOVE_INGREDIANT_RECIPE(state,payload){
            state.recipe.metadata.ingredients.splice(payload, 1);
      },
      SET_RECIPE_IMAGE(state,payload){
            state.recipe.metadata.feature_image.url = payload;
      },
      SET_RECIPE_FILE(state,payload){
            state.recipe.metadata.feature_image.file = payload;
      },
      TOGGLE_EDITING(state){
            state.editing = !state.editing;
      },
      SET_RECIPE_DEFAULT(state){
         state.recipe = {
             metadata:{
                 feature_image: {
                 },
                 ingredients:[]
             }
         };
     },
   }
  });