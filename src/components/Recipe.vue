
<template>
  <div class="recipe-component">
    <div class="recipe-container">
        <h1>{{ recipe.title }}</h1>
        <article>Kategorie:</article>
        <ul>
          <li v-for="(category, index) in recipe.categories" :key="index">{{ category }}</li>
        </ul><br>
        <article>{{ recipe.description }}</article>
      </div>
    </div>
</template>

<script>
// Imports
import { mapState } from 'vuex'
const fb = require('../firebaseConfig.js')

// Exports
export default {
  data () {
    return {
      id: this.$route.params.id,
      recipe: {}
    }
  },
  methods: {
  },
  created () {
    fb.recipesCollection.doc(this.id).get().then((doc) => {
      this.recipe = doc.data()
    })
  },
  computed: {
    ...mapState(['userProfile', 'currentUser', 'recipes'])
  }
}
</script>
