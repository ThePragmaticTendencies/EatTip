import { ingredientsDb, recipesDb, enumsDb, models } from '../data.js'
import { queries } from '../common/queries.js'
import { validator} from './entityValidator'


export const repository = {
  ingredients: _getIngredients(),
  recipes: _getRecipes(),
  saveRecipe(recipe) {
    let model = models['recipeModel']
    let isValidEntity = _getEntityChecks(recipe, model, []).indexOf(false) > -1

    if (isValidEntity) {
      addEntity(_getDbEntity(recipe, model))
    }
  }
}

function _getDbEntity(entity, model) {
  let savedEntity
  let entityProperties = Object.getOwnPropertyNames(model)

  entityProperties.forEach((entityProperty) => {
    let modelName
    let settings = model[entityProperty]
    let value = entity[entityProperty]

    let isModel = settings.validate.search('Model') > 0
    let isEnum = settings.validate.search('Enum') > 0
    let isComplexEntity = isModel || isEnum

    if (isComplexEntity) {
      modelName = isModel ? settings.validate.replace('Model', '') : settings.validate.replace('Enum', '')
    }

    let getValue = (value) => {
      let entityValue

      if (isModel) {
        entityValue = value['id']
      } else if (isEnum) {
        entityValue = enumsDb[entityProperty][value]
      } else {
        entityValue = value
      }

      return entityValue
    }

    if (!settings.collection) {
      savedEntity[entityProperty] = getValue(value)
    } else {
      savedEntity[entityProperty] = []
      value.forEach(function (element) {
        savedEntity[entityProperty].push(getValue(element))
      })
    }
  })

  return savedEntity
}

function _getEntityChecks(entity, model, checks) {
  let entityProperties = Object.getOwnPropertyNames(entity)

  entityProperties.forEach((entityProperty) => {
    let modelName
    let settings = model[entityProperty]
    let value = entity[entityProperty]

    let isModel = settings.validate.search('Model') > 0
    let isEnum = settings.validate.search('Enum') > 0
    let isComplexEntity = isModel || isEnum

    if (isComplexEntity) {
      modelName = isModel ? settings.validate.replace('Model', '') : settings.validate.replace('Enum', '')
    } else {
      modelName = settings.validate
    }

    if (!settings.collection) {
      if (isModel) {
        checks.push(_getEntityChecks(value, modelName, checks))
      } else if (isEnum) {
        checks.push(validator['enum'](value, modelName))
      } else {
        checks.push(validator[modelName](value))
      }
    } else {
      checks.push(validator['collection'](entityProperty))

      value.forEach(function (element) {
        checks = _getEntityChecks(element, models[modelName], checks)
      })
    }
  })

  return checks
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
  return models[name + 'Enum'] ?
    queries.getPropertyNameByVal(enumsDb[name], value) :
    enumsDb.common.notImplemented
}
