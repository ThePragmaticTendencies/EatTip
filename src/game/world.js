export class World {
  constructor (width, height, gridSize) {
    this.size = { width: width, height: height }
    this.gridSize = gridSize

    this.loadWorld()
  }

  loadWorld() {
    this.worldGeography = this.createWorldMap()
    this.worldObjects = {}
  }

  createWorldMap() {
    let worldMap = {}

    for (let i = 0; i < this.size.height; i++) {
      for (let k = 0; k < this.size.width; k++) {
        if (!worldMap[i]) {
          worldMap[i] = {}
        }

        worldMap[i][k] = []
      }
    }

    return worldMap
  }

  update() {
    for (let i = 0; i < this.size.height; i++) {
      for (let k = 0; k < this.size.width; k++) {
        this.worldGeography[i][k] = []
      }
    }

    let worldObjects = this.getWorldObjectsNames()

    worldObjects.forEach((worldObjectName) => {
      let worldObject = this.worldObjects[worldObjectName]
      let habitant = worldObject.habitant
      if (habitant.exists) {
        let position = habitant.position
        worldObject.surrounding = {}

        this.worldGeography[position.height][position.width].push(habitant)
      } else {
      this.removeHabitant(worldObjectName)
      }
    })

    worldObjects = this.getWorldObjectsNames()
    worldObjects.forEach((worldObjectName) => {
      let worldObject = this.worldObjects[worldObjectName]
      let habitant = worldObject.habitant
      worldObject.surrounding = this.getSurrounding(habitant.position, habitant.viewDistance)
    })
  }

  addHabitant(name, creation) {
    if (!this.worldObjects[name]) {
      let gridPosition = this.getRandomSpot()
      if (!gridPosition) {
        return
      }

    creation.setPosition(gridPosition)

    let newHabitant = {
      habitant: creation,
      surrounding: this.getSurrounding(creation.position, creation.viewDistance)
    }

    this.worldObjects[name] = newHabitant
    this.worldGeography[gridPosition.height][gridPosition.width] = [newHabitant.habitant]
    }
  }

  removeHabitant(name) {
      delete this.worldObjects[name]
  }

  getWorldObjectsNames() {
    return Object.getOwnPropertyNames(this.worldObjects)
  }

  getSurrounding(position, viewDistance) {
    let surrounding = {}

    if (viewDistance === 0) {
      return surrounding
    }

    let currentSpotPosition = 0

    for (let i = -viewDistance; i <= viewDistance; i++) {
      if (this.worldGeography[position.height + i]) {
        surrounding[i] = {}
        let horizontalSurrounding
        if (i !== 0 && (horizontalSurrounding =  this.worldGeography[position.height + i][position.width])) {
          surrounding[i][currentSpotPosition] = horizontalSurrounding
        }
      }
    }

    for (let k = -viewDistance; k <= viewDistance; k++) {
      let verticalSurrounding
      if (k !== 0 && (verticalSurrounding = this.worldGeography[position.height][position.width + k])) {
        surrounding[currentSpotPosition][k] = verticalSurrounding
      }
    }

      return surrounding
  }

  getFromSpot(gridPosition) {
    return this.worldGeography[gridPosition.height][gridPosition.width]
  }

  getRandomSpot() {
    let width = Math.floor(Math.random() * this.size.width)
    let height = Math.floor(Math.random() * this.size.height)

    let widthMax = this.size.width
    let heightMax = this.size.height

    let i = height
    let k = width

    for (i; i < heightMax; i++) {
      for (k; k < widthMax; k++) {
        if (this.worldGeography[i][k].length === 0) {
          return {
            width: k,
            height: i
          }
        }
      }

      if (i + 1 >= heightMax && height !== 0) {
        widthMax = width
        heightMax = height
        i = 0
        k = 0
      }
    }
  }

  getGridPosition(pixelPosition) {
    return {
      height: pixelPosition.height/this.gridSize,
      width: pixelPosition.width/this.gridSize }
  }

  getPixelPosition(gridPosition) {
    return {
      height: gridPosition.height*this.gridSize,
      width: gridPosition.width*this.gridSize }
  }
}
