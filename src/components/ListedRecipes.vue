<template>
  <div class="listed-recipes-component">

    <div>
      <b-form-input type="search" autocomplete="off" v-model.trim="search" @input="filterIngredients" placeholder="hledat podle ingredianci"></b-form-input>
      <div class="ingredients-block" v-if="filteredIngredients !== [] && search">
        <ul id="filtered-list">
          <li v-for="(filteredIngredient, index) in filteredIngredients" :key="index" class="filtered-ingredient" @click="setIngredient(filteredIngredient)">{{ filteredIngredient }}</li>
        </ul>
      </div>
    </div>

    <div class="chosen-ingredients">
      <div v-for="(ing, index) in ingList" class="ing" :key="index">{{ ing }}
        <div @click="removeItem" class="closes"></div>
      </div>
    </div>

    <div class="recipes-block">

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
      if (!this.ingList.includes(ingredient)) {
        this.ingList.push(ingredient)
        this.search = ''
        this.filteredIngredients = []
      }
      this.showFilteredRecipes()
    },
    removeItem (event) {
      const item = event.target.previousSibling.data.trim()
      const index = this.ingList.indexOf(item)
      this.ingList.splice(index, 1)
      this.showFilteredRecipes()
    },
    showFilteredRecipes () {
      console.log(this.ingList)
    }
  },
  created () {
    this.$store.dispatch('loadPosts')
  }
}

</script>

<style scoped>
.closes {
  background: url('./../assets/close.svg');
  background-repeat: no-repeat;
  background-size: contain;
}
</style>
