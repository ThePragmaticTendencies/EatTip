export class Fox {
  constructor(imageSrc, sizeFactor, position) {
    this.exists = true
    this.image = new Image()
    this.image.src = imageSrc

    this.viewDistance = 1

    this.move = {
      height: 0,
      width: 0
    }

    this.position = position
    this.sizeFactor = sizeFactor || 1

    this.ticks = 0
    this.ticksToUpdate = 20
  }

  setPosition(gridPosition) {
    this.position = gridPosition
  }

  instantInteract(spot) {
    spot.forEach((habitant) => {
      this.kill(habitant)
    })
  }

  operate(spot) {
  }

  kill(habitant) {
    habitant.die && habitant.die()
  }

  render(context, scale) {
    let scaledSize = scale(this.sizeFactor)

    context.drawImage(this.image, scale(this.position.width), scale(this.position.height), scaledSize, scaledSize)
  }

  update(spot, surrounding, directions) {

    this.instantInteract(spot)

    if (this.ticks > this.ticksToUpdate) {
      this.generateRandomMove()
      this.go(surrounding)
      this.ticks = 0
    }

    this.ticks++
  }

  go(surrounding, direction) {
    let nextPosition = this.position
    let currentDirections = direction ? direction : this.move
    let height = currentDirections.height
    let width = currentDirections.width

    let destination = []

    if (this.isMoving(currentDirections)) {
      let swappedDirections = false
      let changedDirection = false

      destination = this.getSurroundingSpot(surrounding, height, width)

      while (!this.canGo(destination)) {
        if (!swappedDirections && !changedDirection) {
          height = currentDirections.width
          width = currentDirections.height
          swappedDirections = true
        } else if (swappedDirections && !changedDirection) {
          height = currentDirections.height === 0 ? currentDirections.height : -1 * currentDirections.height
          width = currentDirections.width === 0 ? currentDirections.width : -1 * currentDirections.width
          changedDirection = true
          swappedDirections = false
        } else if (!swappedDirections && changedDirection) {
          height = currentDirections.width === 0 ? currentDirections.width : -1 * currentDirections.width
          width = currentDirections.height === 0 ? currentDirections.height : -1 * currentDirections.height
        } else {
          changedDirection = false
          swappedDirections = false
        }

        destination = this.getSurroundingSpot(surrounding, height, width)
      }
    }

    this.position = {
      height: this.position.height + height,
      width: this.position.width + width }
  }

  canGo(spot) {
    if (!spot) {
      return false
    }

    let canGo = true
    spot.forEach((habitant) => {
      canGo = canGo && !habitant.kill
    })
    return canGo
  }

  isMoving(move) {
    return move.height !== 0 || move.width !== 0
  }

  generateRandomMove() {
    let randomHeight = Math.floor(Math.random() * 3) -1
    let randomWidth = randomHeight === 0 ? Math.floor(Math.random() * 3) -1 : 0

    this.move.height = randomHeight
    this.move.width = randomWidth
  }

  getSurroundingSpot(surrounding, height, width) {
    return surrounding[height] && surrounding[height][width] ? surrounding[height][width] : null
  }
}
