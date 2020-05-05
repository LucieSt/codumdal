<template>
  <div class="recipe-form-component">

    <div v-if="!submited">

      <div class="round">
        <h2>přidej nový recept</h2>
      </div>

      <b-form @submit.prevent>
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
          required
          rows="3"
          max-rows="10"
        ></b-form-textarea>
        </b-form-group>

        <b-form-group id="input-group-4">
          <b-form-checkbox-group v-model="recipe.categories" id="checkboxes-4">
            <b-form-checkbox value="Předkrm">Předkrm</b-form-checkbox>
            <b-form-checkbox value="Polévka">Polévka</b-form-checkbox>
            <b-form-checkbox value="Hlavní jídlo">Hlavní jídlo</b-form-checkbox>
            <b-form-checkbox value="Dezert">Dezert</b-form-checkbox>
            <b-form-checkbox value="Nápoj">Nápoj</b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>

        <b-button @click="createRecipe" type="submit" variant="primary">Přidat</b-button>
      </b-form>

    </div>

    <div v-if="submited" class="posted-recipe-message">
      <h1>Nový recept byl vložen</h1>
      <b-button variant="info"><router-link v-bind:to="'/recept/' + this.recipeId">zobrazit recept</router-link></b-button>
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex'
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
      submited: false
    }
  },
  computed: {
    ...mapState(['userProfile', 'currentUser', 'recipes'])
  },
  methods: {
    createRecipe () {
      fb.recipesCollection.add({
        createdOn: new Date(),
        title: this.recipe.title,
        description: this.recipe.description,
        categories: this.recipe.categories,
        userId: this.currentUser.uid,
        userName: this.userProfile.name
      }).then(ref => {
        this.recipe = {
          title: '',
          description: '',
          categories: []
        }
        this.recipeId = ref.id
        this.submited = true
      }).catch(err => {
        console.log(err)
      })
    }
  }
}

</script>
