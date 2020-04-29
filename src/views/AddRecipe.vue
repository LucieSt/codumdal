<template>
  <div class="add-recipe-container">
    Novy recept
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
