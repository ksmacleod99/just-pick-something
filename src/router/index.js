import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Recipe from '../views/Recipe.vue'
import Cookbook from '../views/Cookbook.vue'
import AddRecipe from '../views/AddRecipe.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/recipes/:id',
    name: 'recipe',
    component: Recipe,
    props: true
  },
  {
    path: '/cookbook',
    name: 'cookbook',
    component: Cookbook
 },
 {
   path: '/add_recipe',
   name: 'addRecipe',
   component: AddRecipe
 }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
