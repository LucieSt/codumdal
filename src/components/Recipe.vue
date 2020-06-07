
<template>
  <div class="recipe-component">
    <div class="recipe-container">
      <div id="player"></div>
      <h1>{{ recipe.title }}</h1>
      <article>Kategorie:</article>
      <ul>
        <li v-for="(category, index) in recipe.categories" :key="index">{{ category }}</li>
      </ul><br>
      <article>Ingredience:</article>
      <ul>
        <li v-for="(ingredient, index) in recipe.ingredients" :key="index">{{ ingredient.ingredient }} {{ ingredient.quantity }}</li>
      </ul><br>
      <article>{{ recipe.description }}</article>
    </div>
  </div>
</template>

<script>
// Imports
import { mapState } from 'vuex'
const fb = require('../firebaseConfig.js')
var YouTubeIframeLoader = require('youtube-iframe')

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
  },
  mounted () {
    YouTubeIframeLoader.load(function (YT) {
      // eslint-disable-next-line no-new
      new YT.Player('player', {
        height: '390',
        width: '640',
        videoId: 'M7lc1UVf-VE'
      })
    })
  }
}
</script>
