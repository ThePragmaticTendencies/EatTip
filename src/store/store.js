import { repository } from '../repository/repository.js'

const store = {
  state: {
    ingredients: repository.ingredients,
    recipes: repository.recipes,
    composedRecipe: { id: null, name: '', ingredients: []}
  },
  setComposedRecipe: function (id) {
      this.state.composedRecipe = repository.getRecipeById(id)
  },
  addIngredientToRecipe: function (id) {
    this.state.composedRecipe.ingredients.push(repository.getIngredientById(id))
  },
  removeIngredientFromRecipe: function (index) {
      this.state.composedRecipe.ingredients.splice(index, 1)
  },
  getIngredientById: function (id) {
    return repository.getIngredientById(id)
  }
}

export { store }
