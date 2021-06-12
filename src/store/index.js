import { createLogger, createStore } from 'vuex'
import bucket from '../plugins/cosmic'

const cosmic = {
   namespaced: true,
   state: {
      all: [],
      loading: false
   },
   mutations: {
      add(state, recipes){
         state.list.unshift(recipes)
      },
      set(state, recipes){
         state.all = recipes
      },
      setLoading(state, loading){  //update loading status
         state.loading=loading
      }
   },
   actions: {
      getAllRecipes({ commit }) {
         bucket.getObjects(recipes => {
            commit('set', recipes)
         })
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