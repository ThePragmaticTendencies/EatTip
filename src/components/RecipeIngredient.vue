<template lang="html">
  <div class="recipe-ingredient">
    <button class="btn btn-danger btn-sm"@click="removeIngredientFromRecipe(index)">X</button>
    <div class="d-inline-block">
      {{ingredient.name}}
    </div>
  </div>
</template>

<script>
export default {
  props: ['ingredient', 'index'],
  methods: {
    removeIngredientFromRecipe(id) {
      debugger
      this.$store.dispatch('removeIngredientForRecipe', id)
    }
  }
}
</script>
