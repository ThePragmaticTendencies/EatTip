<template lang="html">
  <div class="row ingredients">
    <Ingredient
      v-for= "(item, index) in ingredients"
      :key="index"
      :ingredient="item"
    />
  </div>
</template>

<script>
import Ingredient from './Ingredient.vue'

export default {
  props: ['ingredients'],
  components: {
    Ingredient
  }
}
</script>

<style lang="css">
</style>
