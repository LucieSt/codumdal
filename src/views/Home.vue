<template>
  <div class="home-view">
    Bude tu hlavne vyhledavani receptu podle zadanych ingredienci, mozna nejake graficke demo, jak na to. Tri obrazky vedle sebe? 1. ruka drzi pivo, 2. "Sele na pivu: mate pivo, chybi sele" 3. ??
    <listed-recipes/>
  </div>
</template>

<script>
// @ is an alias to /src

import ListedRecipes from '@/components/ListedRecipes.vue'

export default {
  components: {
    ListedRecipes
  },
  name: 'Home'
}
</script>
