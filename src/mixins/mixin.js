export default {
  data() {
    return {
      enums: {
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
      },
      currentDishIngredients: []
    }
  },
  methods: {
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
    getEnumName: function (value, name) {
      return this.enums.model[name] ?
        this._getPropertyNameByVal(this.enums[name], value) :
        this.enums.common.notImplemented
    },
    _getPropertyNameByVal: function (object, value) {
      for (var property in object) {
        if (object[property] === value) {
            return property
        }
      }
      return this.enums.common.unknown
    }
  }
}
