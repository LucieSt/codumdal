<template>
  <div class="recipe-form-component">

    <b-form>
      <b-form-group
        id="input-group-1"
        label="název:"
        label-for="input-1"
        description=""
      >
        <b-form-input
          id="input-1"
          v-model="recipe.title"
          type="text"
          required
          placeholder=""
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="popis:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="recipe.directions"
          required
          placeholder=""
        ></b-form-input>
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
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>

    <div id="preview">
      <h3>preview of the recipe</h3>
      <p>nazev: {{ recipe.title }}</p>
      <p>postup: {{ recipe.directions }}</p>
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      recipe: {
        title: '',
        directions: '',
        categories: []
      }
    }
  }
}

</script>
