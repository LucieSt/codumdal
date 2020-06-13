<template>
  <div class="categories-component">
    <div class="categories-container">

      <div class="nav-categories">
        <b-nav pills align="center">
          <b-nav-item active-class="active" :to="'/kategorie/' + item.route" v-for="(item, index) in categories" :key="index">{{ item.category }}</b-nav-item>
        </b-nav>
      </div>

      <listed-recipes/>

      <!-- <div class="categories-listed-recipes">
        <div v-if="hiddenRecipes.length">
          <div v-for="(hiddenRecipe, index) in this.hiddenRecipes" class="recipe-li" :key="index">
            <router-link v-bind:to="'/recept/' + hiddenRecipe.id"><h2 class="title">{{ hiddenRecipe.title }}</h2></router-link>
            <article>od {{ hiddenRecipe.userName }}</article>
          </div>
        </div>

        <div v-if="recipes.length">
          <div v-for="(recipe, index) in this.recipes" class="recipe-li" :key="index">
            <div v-if="recipe.categories.includes('Dezert')">
              <router-link v-bind:to="'/recept/' + recipe.id"><h2 class="title">{{ recipe.title }}</h2></router-link>
              <article>od {{ recipe.userName }}</article>
            </div>
          </div>
        </div>
      </div> -->

    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ListedRecipes from '@/components/ListedRecipes.vue'

export default {
  components: {
    ListedRecipes
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapState(['userProfile', 'currentUser', 'recipes', 'hiddenRecipes', 'categories'])
  }
  // watch: {
  //   $route: function (to, from) {
  //   }
  // }
}
</script>
