<template lang="html">
  <div class="row recipes">
    <Recipe
      v-for= "(item, index) in recipes"
      :key="index"
      :recipe="item"
      @click.native="selectRecipe(item.id)"
    />
  </div>
</template>

<script>
import { store } from '../store/store.js'

import Recipe from './Recipe.vue'

export default {
  props: ['recipes'],
  methods: {
    selectRecipe(id) {
      debugger
      let recipe = this.$store.getters.getRecipeById(id)
      this.$store.dispatch('setRecipe', recipe)
    }
  },
  components: {
    Recipe
  }
}
</script>
