<template>
  <div class="recipe-form-component">

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

      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>

    <!-- <div id="preview">
      <h3>preview of the recipe</h3>
      <p>nazev: {{ recipe.title }}</p>
      <p>postup: {{ recipe.directions }}</p>
    </div> -->
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
      }
    }
  },
  computed: {
    ...mapState(['userProfile', 'currentUser'])
  },
  methods: {
    createPost () {
      fb.postsCollection.add({
        createdOn: new Date(),
        content: this.post.content,
        userId: this.currentUser.uid,
        userName: this.userProfile.name,
        comments: 0,
        likes: 0
      }).then(ref => {
        this.post.content = ''
      }).catch(err => {
        console.log(err)
      })
    }
  }
}

</script>
