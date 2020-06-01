import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

const fb = require('./../firebaseConfig.js')

Vue.use(Vuex)

Vue.axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com/posts'

// handle the page reload
fb.auth.onAuthStateChanged(user => {
  if (user) {
    store.commit('setCurrentUser', user)
    store.dispatch('fetchUserProfile')

    fb.recipesCollection.orderBy('createdOn', 'desc').onSnapshot(snapshot => {
      if (snapshot.docChanges().length !== snapshot.docs.length) {
        const recipe = snapshot.docChanges()[0].doc.data()
        recipe.id = snapshot.docChanges()[0].doc.id
        store.commit('setHiddenRecipes', recipe)
      } else {
        const changes = snapshot.docChanges()
        const recipesArray = []
        changes.forEach(change => {
          const recipe = change.doc.data()
          recipe.id = change.doc.id
          recipesArray.push(recipe)
        })
        store.commit('setRecipes', recipesArray)
      }
    })

    fb.categoriesCollection.get().then(snap => {
      const categoriesArray = []
      snap.forEach(doc => {
        const category = doc.data()
        category.id = doc.id
        categoriesArray.push(category)
      })
      store.commit('setCategories', categoriesArray)
    })
  }
})

export const store = new Vuex.Store({
  state: {
    currentUser: null,
    userProfile: {},
    recipes: [],
    hiddenRecipes: [],
    categories: [],
    posts: []
  },
  actions: {
    clearData ({ commit }) {
      commit('setCurrentUser', null)
      commit('setUserProfile', {})
      commit('setRecipes', null)
      commit('setHiddenRecipes', null)
    },
    fetchUserProfile ({ commit, state }) {
      fb.usersCollection.doc(state.currentUser.uid).get().then(res => {
        commit('setUserProfile', res.data())
      }).catch(err => {
        console.log(err)
      })
    },
    loadPosts ({ commit }) {
      Vue.axios.get().then(result => {
        commit('SAVE_POSTS', result.data)
      }).catch(error => {
        throw new Error(`API ${error}`)
      })
    }
  },
  mutations: {
    setCurrentUser (state, val) {
      state.currentUser = val
    },
    setUserProfile (state, val) {
      state.userProfile = val
    },
    setRecipes (state, val) {
      if (val) {
        state.recipes = val
      } else {
        state.recipes = []
      }
    },
    setHiddenRecipes (state, val) {
      if (val) {
        // make sure not to add duplicates
        if (!state.hiddenRecipes.some(x => x.id === val.id)) {
          state.hiddenRecipes.unshift(val)
        }
      } else {
        state.hiddenRecipes = []
      }
    },
    setCategories (state, val) {
      if (val) {
        state.categories = val
      } else {
        state.categories = []
      }
    },
    SAVE_POSTS (state, posts) {
      state.posts = posts
    }
  },
  modules: {
  }
})
