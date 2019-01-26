import { ingredientsDb, recipesDb, enumsDb } from '../data.js'
import { queries } from '../common/queries.js'


export const repository = {
  ingredients: _getIngredients(),
  recipes: _getRecipes()
}

function _getIngredients() {
  let ingredients = []

  ingredientsDb.forEach((ingredient) => {
    ingredient.allowance = _getEnumName(ingredient.allowance, 'allowance')
    ingredients.push(ingredient)
  })

  return ingredients
}

function _getRecipes() {
  let recipes = []

  recipesDb.forEach((recipe) => {
    let ingredients = []

    recipe.ingredients.forEach((ingredientId) => {
      ingredients.push(queries.getById(ingredientId, ingredientsDb))
    })

    recipe.ingredients = ingredients
    recipes.push(recipe)
  })

  return recipes
}

function _getEnumName(value, name) {
  return enumsDb.model[name] ?
    queries.getPropertyNameByVal(enumsDb[name], value) :
    enumsDb.common.notImplemented
}
