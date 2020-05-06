<template>
  <div class="nav-categories-component">
    <b-nav pills align="center">
        <b-nav-item active-class="active" :to="'/kategorie/' + item.route" v-for="(item, index) in categories" :key="index">{{ item.category }}</b-nav-item>
      </b-nav>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapState(['userProfile', 'currentUser', 'recipes', 'hiddenRecipes', 'categories'])
  },
  methods: {
  }
}

</script>
