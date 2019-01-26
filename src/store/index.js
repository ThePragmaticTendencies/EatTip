import Vue from 'vue'
import Vuex from 'vuex'

import { repository } from '../repository/repository.js'
import { queries } from '../common/queries.js'

import { mutations } from './mutations'
import * as actions from './actions'

Vue.use(Vuex)

const state = {
  user: {},
  ingredients: [],
  recipes: [],
  recipe: { id: null, name: '', ingredients: []}
}

const getters = {
  getIngredientById: (state) => (id) => {
    return queries.getById(id, state.ingredients)
  },
  getRecipeById: (state) => (id) => {
    debugger
    return queries.getById(id, state.recipes)
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
