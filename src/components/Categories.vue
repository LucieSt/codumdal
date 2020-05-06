<template>
  <div class="categories-component">
    <div class="categories-container">
      <nav-categories/>
      <listed-recipes/>
    </div>
  </div>
</template>

<script>

import NavCategories from '@/components/NavCategories'
import ListedRecipes from '@/components/ListedRecipes'

export default {
  components: {
    NavCategories,
    ListedRecipes
  }
}
</script>
