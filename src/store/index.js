import { createLogger, createStore } from 'vuex'
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
   },

   getters: {
      menu: state => {return state.menu},
      recipes: state => {return state.recipes},
      getRecipe: state => {return state.currentRecipe},
      loading: state => {return state.status.loading}
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
            commit('setRecipe', currentRecipe)
            
         //set status to SUCCESS
         commit('SUCCESS')
         }).catch(err =>{
            //status error
            commit('ERROR', err)
         })
      }
   },
   mutations: { //change the state in the store
      setDrawer: (state, payload) => { state.drawer = payload },
      setRecipe: (state, payload) => {state.currentRecipe = payload},
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
       SET_Cosmic: (state, payload) => { state.cosmicDB = payload },
       SET_Recipes: (state, payload) => { state.recipes = payload},
   }
  });