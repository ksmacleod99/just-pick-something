import { createLogger, createStore } from 'vuex'
import bucket from '../plugins/cosmic'

const cosmic = {
   namespaced: true,
   state: {
      list: [],
      loading: false
   },
   mutations: {
      add(state, recipes){
         state.list.unshift(recipes)
      },
      set(state, recipes){
         state.list = recipes
      },
      setLoading(state, loading){  //update loading status
         state.loading=loading
      }
   },
   actions: {
      async importData({ commit }) {
         commit('setLoading', true)
         const result = await bucket.getObjects({
            query: {
               type: 'recipes'
            },
         })
         //const json = await result.json()
         commit('set', result)
         commit('setLoading', false)
      }
   },
   getters: {
      recipes(state){
         return state.list
      }
   }
}

export default createStore({
   plugins: [createLogger()],
   state: {},
   mutations: {},
   actions: {},
   modules: { cosmic },
  });