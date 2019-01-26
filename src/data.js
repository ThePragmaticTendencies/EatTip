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
  model: {
    id: 'id',
    name: 'name',
    allowance: 'allowance',
    safeQuantity: 'safeQuantity',
    units: 'units'
  },
  common: {
    unknown: 'Unknown',
    notImplemented: 'Not implemented'
  }
}

export { ingredientsDb, recipesDb, enums as enumsDb }
