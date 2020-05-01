import Vue from 'vue'
import VueRouter from 'vue-router'
// import firebase from 'firebase'

import Home from '../views/Home.vue'
import AddRecipe from '../views/AddRecipe.vue'
import Recipe from '../views/Recipe.vue'
import Categories from '../views/Categories'
import Login from '../views/Login'
import User from '../views/User'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/novy-recept',
    name: 'AddRecipe',
    component: AddRecipe
  },
  {
    path: '/recept', // /:id ?
    name: 'Recipe',
    component: Recipe
  },
  {
    path: '/kategorie',
    name: 'Categories',
    component: Categories
  },
  {
    path: '/uzivatel',
    name: 'User',
    component: User
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
