let ingredientsDb = [
  {
    id: 1,
    name: "Marchewka",
    allowance: 0,
    safeQuantity: null,
    unit: 0
  },
  {
    id: 2,
    name: "Papryka czerwona",
    allowance: 0,
    safeQuantity: null,
    unit: 0
  },
  {
    id: 3,
    name: "Szpinak",
    allowance: 1,
    safeQuantity: 143,
    unit: 0
  },
  {
    id: 4,
    name: "Bataty",
    allowance: 2,
    safeQuantity: 70,
    unit: 0
  }
]

let recipesDb = [
  {
    id: 1,
    name: "Zupa Pomidorowa",
    ingredients: [1, 2]
  },
  {
    id: 2,
    name: "Dish Two",
    ingredients: [2, 3]
  },
  {
    id: 3,
    name: "Dish Three",
    ingredients: [3, 4]
  }
]

let enums = {
  allowance: {
    allowed: 0,
    moderate: 1,
    forbidden: 2
  },
  units: {
    g: 0,
    ml: 1
  },
  common: {
    unknown: 'Unknown',
    notImplemented: 'Not implemented'
  },
}

let models = {
  ingredientModel: {
    id: {
      collection: false,
      validate: 'int'
    },
    name: {
      collection: false,
      validate: 'string'
    },
    allowance: {
      collection: false,
      validate: 'allowanceEnum'
    },
    safeQuantity: {
      collection: false,
      validate: 'int'
      },
    units: {
      collection: false,
      validate: 'unitsModel'
    }
  },
  recipeModel: {
    id: {
      collection: false,
      validate: 'int'
    },
    name: {
      collection: false,
      validate: 'string'
    },
    ingredients: {
      collection: true,
      validate: 'ingredientModel'
    }
  },
  allowanceEnum: {
    allowance: {
      validate: 'string'
    }
  }
}

export { ingredientsDb, recipesDb, enums as enumsDb, models }
