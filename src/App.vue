<template>
  <div id="app">
    <b-nav pills align="center" v-if="currentUser">
      <b-nav-item active-class="active" to="/" exact>Domů</b-nav-item>
      <b-nav-item active-class="active" to="/kategorie" exact>Kategorie</b-nav-item>
      <b-nav-item active-class="active" to="/novy-recept" exact>Nový recept</b-nav-item>
    </b-nav>
    <router-view/>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['currentUser'])
  }
}
</script>
