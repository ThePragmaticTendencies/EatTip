<template lang="html">
  <div class="col-md-4">
    <div class="tip-card">
      <div class="">
        Name: {{recipe.name}}
      </div>
      <div class="">
        Ingredients: {{ingredientsCount}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['recipe'],
  computed: {
    ingredientsCount() {
      return this.recipe.ingredients.length
    }
  }
}
</script>
