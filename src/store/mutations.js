import * as types from './mutation-types'

export const mutations = {
  [types.SET_INGREDIENTS] (state, payload) {
    state.ingredients = payload
  },

  [types.SET_RECIPES] (state, payload) {
    state.recipes = payload
  },

  [types.SET_RECIPE] (state, payload) {
    state.recipe = payload
  },

  [types.ADD_RECIPE] (state, payload) {
    state.recipes.push(payload)
  },

  [types.ADD_INGREDIENT_FOR_RECIPE] (state, payload) {
    state.recipe.ingredients.push(payload)
  },

  [types.REMOVE_INGREDIENT_FOR_RECIPE] (state, index) {
    state.recipe.ingredients.splice(index, 1)
  },

  [types.SIGN_IN] (state, payload) {
    state.user = payload
  },

  [types.SIGN_OUT] (state) {
    state.user = null
  },
}
