<template>
  <div class="add-recipe-component">
    <div class="round">
      <h2>přidej nový recept</h2>
    </div>
    <recipe-form/>
  </div>
</template>

<script>

import RecipeForm from '@/components/RecipeForm.vue'

export default {
  components: {
    RecipeForm
  }
}
</script>
