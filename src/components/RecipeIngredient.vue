<template lang="html">
  <div class="">
    <div class="d-inline-block">
      Name: {{ingredient.name}}
    </div>
    <button class="d-inline-block btn btn-danger btn-sm"@click="removeIngredient(index)">X</button>
  </div>
</template>

<script>
export default {
  props: ['ingredient', 'removeIngredient', 'index']
}
</script>
