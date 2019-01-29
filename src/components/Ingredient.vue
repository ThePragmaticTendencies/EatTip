<template>
<div class="col-md-4">
  <div class="tip-card">
    <div class="">
      Name: {{ingredient.name}}
    </div>
    <div class="">
      Allowance: {{ingredient.allowance}}
    </div>
    <button class="btn btn-primary btn-sm" @click="addIngredientToRecipe(ingredient.id)">+</button>
  </div>
</div>
</template>

<script>
export default {
  props: ['ingredient'],
  methods: {
    addIngredientToRecipe(id) {
      let ingredient = this.$store.getters.getIngredientById(id)
      this.$store.dispatch('addIngredientForRecipe', ingredient)
    },
  }
}
</script>
