import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase'

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
    // requires authentication?
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/novy-recept',
    name: 'AddRecipe',
    component: AddRecipe,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/recept/:id',
    name: 'Recipe',
    component: Recipe,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/kategorie',
    name: 'Categories',
    component: Categories,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/uzivatel',
    name: 'User',
    component: User,
    meta: {
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
  const currentUser = firebase.auth().currentUser

  if (requiresAuth && !currentUser) {
    next('/login')
  } else if (requiresAuth && currentUser) {
    next()
  } else {
    next()
  }
})

export default router
