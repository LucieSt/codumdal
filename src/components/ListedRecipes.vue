<template>
  <div class="listed-recipes-component">

    <div>
      <b-form-input type="search" v-model.trim="search" @input="filterIngredients" placeholder="hledat podle ingredianci"></b-form-input>
      <div v-if="filteredIngredients !== [] && search">
        <ul>
          <li v-for="(filteredIngredient, index) in filteredIngredients" :key="index" @click="setIngredient(filteredIngredient)">{{ filteredIngredient }}</li>
        </ul>
      </div>
    </div>

    <div>
      <div v-for="(ing, index) in ingList" :key="index">{{ ing }}</div>
    </div>

    <div v-if="hiddenRecipes.length">
      <div v-for="(hiddenRecipe, index) in this.hiddenRecipes" class="recipe-li" :key="index">
        <router-link v-bind:to="'/recept/' + hiddenRecipe.id"><h2 class="title">{{ hiddenRecipe.title }}</h2></router-link>
        <article>od {{ hiddenRecipe.userName }}</article>
      </div>
    </div>

    <div v-if="recipes.length">
      <div v-for="(recipe, index) in this.recipes" class="recipe-li" :key="index">
        <router-link v-bind:to="'/recept/' + recipe.id"><h2 class="title">{{ recipe.title }}</h2></router-link>
        <article>od {{ recipe.userName }}</article>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ingredients from '@/data/ingredients'
// const fb = require('../firebaseConfig.js')

export default {
  data () {
    return {
      ingredients,
      search: '',
      filteredIngredients: [],
      ingList: []
    }
  },
  computed: {
    ...mapState(['userProfile', 'currentUser', 'recipes', 'hiddenRecipes', 'posts'])
  },
  methods: {
    filterIngredients (input) {
      this.filteredIngredients = this.ingredients.filter(ingredient => {
        return ingredient.toLowerCase().includes(this.search.toLowerCase())
      })
    },
    setIngredient (ingredient) {
      this.ingList.push(ingredient)
      this.search = ''
      this.filteredIngredients = []
    }
  },
  created () {
    this.$store.dispatch('loadPosts')
  }
}

</script>
