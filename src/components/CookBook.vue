<template>
<div>
  <div class="col-md-4">
    <div v-if="isVisibleTable">
      <CookedRecipe :recipe="this.$store.state.recipe" />
    </div>
  </div>
  <div class="col-md-6">
    <div>
      <Ingredients :ingredients="this.$store.state.ingredients" />
    </div>
    <div>
      <Recipes :recipes="this.$store.state.recipes" />
    </div>
  </div>
</div>
</template>

<script>
import {
  repository
} from '../repository/repository.js'

import Ingredients from './Ingredients.vue'
import CookedRecipe from './CookedRecipe.vue'
import Recipes from './Recipes.vue'

export default {
  methods: {
    loadIngredients() {
      this.$store.dispatch('setIngredients', repository.ingredients)
    },
    loadRecipes() {
      this.$store.dispatch('setRecipes', repository.recipes)
    }
  },
  computed: {
    isVisibleTable() {
      return this.$store.state.recipe && this.$store.state.recipe.ingredients.length > 0
    }
  },
  components: {
    Ingredients,
    CookedRecipe,
    Recipes
  },
  created() {
    this.loadIngredients(),
      this.loadRecipes()
  }
}
</script>
