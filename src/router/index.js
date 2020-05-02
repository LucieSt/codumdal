import Vue from 'vue'
import VueRouter from 'vue-router'
// import firebase from 'firebase'

import Home from '../components/Home.vue'
import AddRecipe from '../components/AddRecipe.vue'
import Recipe from '../components/Recipe.vue'
import Categories from '../components/Categories'
import Login from '../components/Login'
import User from '../components/User'

Vue.use(VueRouter)

const routes = [
  // handling incorrect rotes
  {
    path: '*',
    redirect: '/'
  },
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
