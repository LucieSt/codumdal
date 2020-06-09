<template>
  <div class="recipe-form-component">

    <div v-if="!submited">

      <div class="round">
        <h2>přidej nový recept</h2>
      </div>

      <b-form-group @submit.prevent>
        <b-form-group
          id="input-group-1"
          label="název:"
          label-for="input-1"
          description=""
        >
          <b-form-input
            id="input-1"
            v-model.trim="recipe.title"
            type="text"
            autocomplete="off"
            required
            placeholder=""
          ></b-form-input>
        </b-form-group>

        <b-form-group
        class="mb-0 textarea-class"
        label="Postup:"
        label-for="textarea"
        description=""
      >
        <b-form-textarea
          id="textarea"
          v-model.trim="recipe.description"
          placeholder=""
          autocomplete="off"
          required
          rows="3"
          max-rows="10"
        ></b-form-textarea>
        </b-form-group>

        <b-form-group
        class="mb-0 url-class"
        label="YouTube URL adresa hudby nebo videa:"
        label-for="url"
        description=""
      >

        <b-form-input
        id="url"
        type="url"
        autocomplete="off"
        v-model.trim="videoUrl"
        ></b-form-input>
        </b-form-group>

        <h3 class="categories-title">Kategorie</h3>

        <b-form-group id="input-group-4">
          <b-form-checkbox-group v-model="recipe.categories" id="checkboxes-4">
            <b-form-checkbox value="Předkrm">Předkrm</b-form-checkbox>
            <b-form-checkbox value="Polévka">Polévka</b-form-checkbox>
            <b-form-checkbox value="Hlavní jídlo">Hlavní jídlo</b-form-checkbox>
            <b-form-checkbox value="Dezert">Dezert</b-form-checkbox>
            <b-form-checkbox value="Nápoj">Nápoj</b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>

        <div>

          <h3>Ingredience</h3>

          <b-form-input type="search" autocomplete="off" v-model.trim="search" @input="filterIngredients" placeholder="napiš a vyber ingredienci"></b-form-input>
          <div v-show="filteredIngredients !== [] && search.length > 1">
            <ul id="filtered-list">
              <li v-for="(filteredIngredient, index) in filteredIngredients" :key="index" class="filtered-ingredient" @click="setIngredient(filteredIngredient)">{{ filteredIngredient }}</li>
            </ul>
          </div>
        </div>

        <div>
          <div class="ingredient" v-for="(ing, index) in ingList" :key="index">
            <div class="ing">
              <span>{{ ing }}</span>
            </div>
            <div class="quantity">
              <b-form-input type="text" autocomplete="off" placeholder="množství" class="input-quantity"></b-form-input>
              <div @click="removeItem" class="closes"></div>
            </div>
          </div>
        </div>

        <b-button @click="createRecipe" type="submit" variant="primary">Přidat</b-button>
      </b-form-group>

    </div>

    <div v-if="submited" class="posted-recipe-message">
      <h1>Nový recept byl vložen</h1>
      <b-button variant="info"><router-link v-bind:to="'/recept/' + this.recipeId">zobrazit recept</router-link></b-button>
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex'
import ingredients from '@/data/ingredients'

const fb = require('../firebaseConfig.js')

export default {
  data () {
    return {
      recipe: {
        title: '',
        description: '',
        categories: []
      },
      recipeId: '',
      submited: false,
      search: '',
      ingredients,
      filteredIngredients: [],
      ingList: [],
      ingredientsNew: [],
      videoUrl: ''
    }
  },
  computed: {
    ...mapState(['userProfile', 'currentUser', 'recipes'])
  },
  methods: {
    createRecipe () {
      const ingreds = document.getElementsByClassName('ingredient')
      ingreds.forEach(ingred => {
        const span = ingred.querySelector('span').innerText
        const input = ingred.querySelector('input').value
        this.ingredientsNew.push({ ingredient: span, quantity: input })
      })
      fb.recipesCollection.add({
        createdOn: new Date(),
        title: this.recipe.title,
        description: this.recipe.description,
        categories: this.recipe.categories,
        ingredients: this.ingredientsNew,
        userId: this.currentUser.uid,
        userName: this.userProfile.name,
        videoID: this.getVideoID(this.videoUrl)
      }).then(ref => {
        this.recipe = {
          title: '',
          description: '',
          categories: []
        }
        this.recipeId = ref.id
        this.submited = true
        this.ingredientsNew = []
        this.ingList = []
        this.filteredIngredients = []
        this.search = ''
      }).catch(err => {
        console.log(err)
      })
    },
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
      } // else hlaska o tom ze uz tu ingredienci pridal
    },
    removeItem (event) {
      const item = event.target.parentElement.parentElement.firstElementChild.innerText
      const index = this.ingList.indexOf(item)
      this.ingList.splice(index, 1)
    },
    getVideoID (videoUrl) {
      let videoID = videoUrl.split('v=')[1]
      console.log(videoID)
      const ampersandPosition = videoID.indexOf('&')
      if (ampersandPosition !== -1) {
        videoID = videoID.substring(0, ampersandPosition)
      }
      return videoID
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
