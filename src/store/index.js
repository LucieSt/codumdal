import Vue from 'vue'
import Vuex from 'vuex'

const fb = require('./../firebaseConfig.js')

Vue.use(Vuex)

// handle the page reload
fb.auth.onAuthStateChanged(user => {
  if (user) {
    store.commit('setCurrentUser', user)
    store.dispatch('fetchUserProfile')

    fb.recipesCollection.orderBy('createdOn', 'desc').onSnapshot(snapshot => {
      const recipesArray = []
      const changes = snapshot.docChanges()
      changes.forEach(change => {
        const recipe = change.doc.data()
        recipe.id = change.doc.id
        recipesArray.push(recipe)
      })
      console.log(recipesArray)
      store.commit('setRecipes', recipesArray)
    })

    // fb.recipesCollection.orderBy('createdOn', 'desc').get().then((snapshot) => {
    //   console.log(snapshot.docs)
    //   const recipesArray = []
    //   snapshot.docs.forEach(doc => {
    //     const recipe = doc.data()
    //     recipe.id = doc.id
    //     recipesArray.push(recipe)
    //   })
    //   store.commit('setRecipes', recipesArray)
    // })
  }
})

export const store = new Vuex.Store({
  state: {
    currentUser: null,
    userProfile: {},
    recipes: []
  },
  actions: {
    clearData ({ commit }) {
      commit('setCurrentUser', null)
      commit('setUserProfile', {})
    },
    fetchUserProfile ({ commit, state }) {
      fb.usersCollection.doc(state.currentUser.uid).get().then(res => {
        commit('setUserProfile', res.data())
      }).catch(err => {
        console.log(err)
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
    }
  },
  modules: {
  }
})
