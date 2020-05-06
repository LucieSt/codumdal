<template>
  <div class="listed-recipes-component">

    <div v-if="hiddenRecipes.length">
      <div v-for="(hiddenRecipe, index) in this.hiddenRecipes" class="recipe-li" :key="index">
        <router-link v-bind:to="'/recept/' + hiddenRecipe.id"><h2 class="title">{{ hiddenRecipe.title }}</h2></router-link>
        <article>{{ hiddenRecipe.userName }}</article>
      </div>
    </div>

    <div v-if="recipes.length">
      <div v-for="(recipe, index) in this.recipes" class="recipe-li" :key="index">
        <router-link v-bind:to="'/recept/' + recipe.id"><h2 class="title">{{ recipe.title }}</h2></router-link>
        <article>{{ recipe.userName }}</article>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
// const fb = require('../firebaseConfig.js')

export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapState(['userProfile', 'currentUser', 'recipes', 'hiddenRecipes'])
  },
  methods: {
  }
}

</script>
