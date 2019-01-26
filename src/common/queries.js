export const queries = {
  getByIds: function (ids, entities) {
    return ids.map((id) => {
      return entities.find((entity) => entity.id === id)
    })
  },
  getById: function (id, entities) {
    return entities.find((entity) => entity.id === id)
  },
  removeById: function (id, entities) {
    var result = []
    entities.forEach((entity) => {
      if (entity.id !== id) {
        result.push(entity)
      }
    })

    return result || []
  },
  getPropertyNameByVal: function (object, value) {
    for (var property in object) {
      if (object[property] === value) {
          return property
      }
    }
  }
}
