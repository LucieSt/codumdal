<template>
  <div class="add-recipe-component">
    <div class="add-recipe-container">
      <recipe-form/>
    </div>
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
