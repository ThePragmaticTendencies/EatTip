<template>
  <div id="app">
    <div class="row">
     <div class="col-md-8">
       <div class="row">
         <Ingredients
           :ingredients="this.$store.state.ingredients"
         />
       </div>
     </div>
     <div class="col-md-4">
        <CookingTable
        :recipe="this.$store.state.recipe"/>
     </div>
   </div>
   <div class="row">
     <Recipes
        :recipes="this.$store.state.recipes"
     />
   </div>
 </div>
</template>

<script>
import { repository } from '../repository/repository.js'

import Ingredients from './Ingredients.vue'
import CookingTable from './CookingTable.vue'
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
  },
  components: {
    Ingredients,
    CookingTable,
    Recipes
  },
  created() {
    this.loadIngredients(),
    this.loadRecipes()
  }
}
</script>
