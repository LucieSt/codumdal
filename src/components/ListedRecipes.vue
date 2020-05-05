<template>
  <div class="listed-recipes-component">
    <div v-for="(recipe, index) in this.recipes" class="recipe-li" :key="index">
      <router-link v-bind:to="'/recept/' + recipe.id"><h2 class="title">{{ recipe.title }}</h2></router-link>
      <article>{{ recipe.userName }}</article>
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
    ...mapState(['userProfile', 'currentUser', 'recipes'])
  },
  methods: {
    // haha () {
    //   console.log(fb)
    // }
  }
  // created () {
  //   fb.recipesCollection.get().then((snapshot) => {
  //     snapshot.docs.forEach((doc, index) => {
  //       this.recipes.push(doc.data())
  //       this.recipes[index].id = doc.id
  //     })
  //   })
  // }
}

</script>
