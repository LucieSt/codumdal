<template>
  <div id="app">
    <div class="nav-container">
      <b-nav pills align="center" v-if="currentUser">
        <b-nav-item active-class="active" to="/" exact>Domů</b-nav-item>
        <b-nav-item active-class="active" to="/kategorie" exact>Kategorie</b-nav-item>
        <b-nav-item active-class="active" to="/novy-recept" exact>Nový recept</b-nav-item>
        <b-nav-item @click="logout" class="logout-nav">Odhlásit</b-nav-item>
      </b-nav>
    </div>
    <router-view/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
const fb = require('./firebaseConfig.js')

export default {
  methods: {
    logout () {
      fb.auth.signOut().then(() => {
        this.$store.dispatch('clearData')
        this.$router.push('/login')
      }).catch(err => {
        console.log(err)
      })
    }
  },
  computed: {
    ...mapState(['currentUser'])
  }
}
</script>
