import * as types from './mutation-types'

export const setIngredients = ({commit}, payload) => {
  commit(types.SET_INGREDIENTS, payload)
}

export const setRecipes = ({commit}, payload) => {
  commit(types.SET_RECIPES, payload)
}

export const setRecipe = ({commit}, payload) => {
  commit(types.SET_RECIPE, payload)
}

export const addRecipe = ({commit}, payload) => {
  commit(types.ADD_RECIPE, payload)
}

export const addIngredientForRecipe = ({commit}, payload) => {
  commit(types.ADD_INGREDIENT_FOR_RECIPE, payload)
}

export const removeIngredientForRecipe = ({commit}, index) => {
  commit(types.REMOVE_INGREDIENT_FOR_RECIPE, index)
}

export const addIngredientForCookedRecipe = ({commit}, payload) => {
  commit(types.ADD_INGREDIENT_FOR_COOKED_RECIPE, payload)
}

export const removeIngredientForCookedRecipe = ({commit}, index) => {
  commit(types.REMOVE_INGREDIENT_FOR_COOKED_RECIPE, index)
}

export const signIn = ({commit}, user_payload) => {
  commit(types.SIGN_IN, user_payload)
}

export const signOut = ({commit}) => {
  commit(types.SIGN_OUT)
}
