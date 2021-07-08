import { createLogger, createStore } from 'vuex'
import bucket from '@/plugins/cosmic'

export default createStore({
   plugins: [createLogger()],
   state:{ 
      //Initial State of the app
      drawer: false,
      currentRecipe: null,
      status:{
         loading: false,
         success: false,
         error: false
      },
      recipes: [],
      plans: [],
      menu: [
         {title: 'Home', link: '/'},
         {title: 'Calendar', link: '/'},
         {title: 'Cookbook', link: '/cookbook'}
      ]
   },

   getters: {
      menu: state => {return state.menu},
      getRecipes: state => {return state.recipes},
      getCurrentRecipe: state => {return state.currentRecipe},
      loading: state => {return state.status.loading}
   },

   actions: { //this is where we pull in CosmicJS stuff
      initCosmic: ({commit}) => {
         commit('LOADING')
         return bucket.getObjects().then(data => {
            //set recipes state
            let recipes = data.objects.filter(obj => {
               return obj.type === 'recipes'
            })
            commit('SET_Recipes', recipes)

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
      setCurrentRecipe: (state, payload) => {state.currentRecipe = payload},
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
       SET_Recipe: (state, payload) => { state.recipes = payload},
   }
  });