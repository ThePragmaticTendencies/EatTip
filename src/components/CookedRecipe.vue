<template lang="html">
  <div class="composed-recipe">
    <div class="input-group recipe-header">
      <input class="form-control transparent-input" v-model="recipeName">
      <span class="input-group-btn">
        <button class="btn btn-warning" type="button">R-set</button>
      </span>
    </div>
    <div>
      <RecipeIngredient
        v-for="(ingredient, index) in recipe.ingredients"
        :key="index"
        :ingredient="ingredient"
        :index="index"
      />
    </div>
    <div class="text-right">
      <button class="btn btn-outline-success" type="button" @click="addRecipe()">Save</button>
    </div>
  </div>
</template>

<script>
import RecipeIngredient from './RecipeIngredient.vue'
import {
  repository
} from '../repository/repository.js'

export default {
  props: ['recipe'],
  methods: {
    addRecipe() {
      repository.saveRecipe(this.recipe)
    }
  },
  computed: {
    recipeName: {
      get() {
        return this.recipe && this.recipe.name || "Add name"
      },
      set(value) {
        this.recipe.name = value;
      }
    }
  },
  components: {
    RecipeIngredient
  }
}
</script>
