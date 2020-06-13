<template>
  <div class="listed-recipes-component">

    <section v-if="main">
      <div>
        <b-form-input type="search" autocomplete="off" v-model.trim="search" @input="filterIngredients" placeholder="např. Ananasový džus"></b-form-input>
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
    </section>

    <div class="recipes-block">

      <div v-if="hiddenRecipes.length && !ingList.length">
        <div v-for="(hiddenRecipe, index) in this.hiddenRecipes" class="recipe-li" :key="index">
          <router-link v-bind:to="'/recept/' + hiddenRecipe.id"><h2 class="title">{{ hiddenRecipe.title }}</h2></router-link>
          <article class="from">od {{ hiddenRecipe.userName }}</article>
        </div>
      </div>

      <div v-if="!ingList.length">
        <div v-for="(recipe, index) in this.recipes" class="recipe-li" :key="index">
          <router-link v-bind:to="'/recept/' + recipe.id"><h2 class="title">{{ recipe.title }}</h2></router-link>
          <article class="from">od {{ recipe.userName }}</article>
        </div>
      </div>

      <div v-if="filteredRecipes.length && ingList.length">
        <div v-for="(recipe, index) in this.filteredRecipes" class="recipe-li" :key="index">
          <router-link v-bind:to="'/recept/' + recipe.id"><h2 class="title">{{ recipe.title }}</h2></router-link>
          <article class="from">od {{ recipe.userName }}</article>
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
      ingList: [],
      filteredRecipes: []
    }
  },
  computed: {
    ...mapState(['userProfile', 'currentUser', 'recipes', 'hiddenRecipes', 'posts', 'categories']),
    main () {
      return this.$route.path === '/'
    }
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
      this.filteredRecipes = []
      this.recipes.forEach(recipe => {
        if (this.ingList.every(ingredient => recipe.ingredientsFind.includes(ingredient))) {
          this.filteredRecipes.push(recipe)
        }
      })
    }
  },
  created () {
    this.$store.dispatch('loadPosts')
  },
  watch: {
    '$route.params.id': function (id) {
      if (this.$route.path !== '/') {
        console.log(id)
      }
    }
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
