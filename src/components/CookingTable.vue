<template lang="html">
  <div class="composedRecipe">
    <div class="form-group">
      <label>Recipe:</label>
      <input class="form-control" placeholder={{recipeName()}}>
    </div>
    <div>
      <RecipeIngredient
        v-for="(ingredient, index) in recipe.ingredients"
        :key="index"
        :ingredient="ingredient"
        :index="index"
        :removeIngredient="removeIngredientFromRecipe"
      />
    </div>
  </div>
</template>

<script>
import RecipeIngredient from './RecipeIngredient.vue'

export default {
  props: ['recipe'],
  methods: {
    removeIngredientFromRecipe(id) {
      this.$store.dispatch('removeIngredientForRecipe', id)
    }
  },
  computed: {
    recipeName () {
      return recipe.name || "Add name"
    }
  },
  components: {
    RecipeIngredient
  }
}
</script>
