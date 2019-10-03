let validator = {
  int: (entity) => {
    return isNaN(entity) ? false : (parseFloat(entity) | 0) === entity;
  },
  string: (entity) => {
    return typeof entity === 'string'
  },
  collection: (entity) => {
    return Array.isArray(entity)
  },
  enum: (entity, model) => {
    return Array.isArray(entity)
  }
}

export { validator }
