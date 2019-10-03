export const queries = {
  addEntity: function (entity, entities) {
    let index, maxIndex = 0

    entities.forEach((element) => {
      if (element.id == entity.id) {
        index = entity.id
      } else if (element.id > maxIndex) {
        maxIndex = element.id
      }
    })

    return index || maxIndex + 1
  },
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
