export class Bunny {
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
    this.spot = []
    this.sizeFactor = sizeFactor || 1

    this.ticks = 0
    this.ticksToUpdate = 4

    this.controls()
  }

  setPosition(gridPosition) {
    this.position = gridPosition
  }

  instantInteract(habitant) {
  }

  operate() {
    this.spot.forEach((habitant) => {
      this.dig(habitant)
    })
  }

  dig(habitant) {
    habitant.interact && habitant.interact()
  }

  die() {
    this.exists = false
  }

  render(context, scale) {
    let scaledSize = scale(this.sizeFactor)
    let positionWidth = scale(this.position.width)
    let positionHeight = scale(this.position.height)

    if (this.sizeFactor !== 1) {
      let difference = scale(1) - scaledSize
      positionWidth = positionWidth + difference/2
      positionHeight = positionHeight + difference/2
    }

    context.drawImage(this.image, positionWidth, positionHeight, scaledSize, scaledSize)
  }

  update(spot, surrounding, directions) {
    this.spot = spot;
    this.instantInteract(spot)

    if (this.ticks > this.ticksToUpdate) {
      this.go(surrounding, directions)
      this.move.height = 0
      this.move.width = 0
      this.ticks = 0
    }

    this.ticks++
  }

  go(surrounding, direction) {
    let currentDirections = direction ? direction : this.move
    let height = currentDirections.height
    let width = currentDirections.width

    let destination = []

    if (this.isMoving(currentDirections)) {
      destination = this.getSurroundingSpot(surrounding, height, width)
      if (!this.canGo(destination)) {
        height = 0
        width = 0
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

    return true
  }

  isMoving(move) {
    return move.height !== 0 || move.width !== 0
  }

  controls() {
    document.onkeydown = function (e) {
        if (e.keyCode === 39) { this.move.width = 1 }
        if (e.keyCode === 37) { this.move.width = -1 }
        if (e.keyCode === 38) { this.move.height = -1 }
        if (e.keyCode === 40) { this.move.height = 1 }
        if (e.keyCode === 32) { this.operate() }
    }.bind(this)
  }

  controlsOriginal() {
    document.onkeydown = function (e) {
      debugger
        if (e.keyCode === 39) { this.move.width = 1 }
        if (e.keyCode === 37) { this.move.width = -1 }
        if (e.keyCode === 38) { this.move.height = -1 }
        if (e.keyCode === 40) { this.move.height = 1 }
        if (e.keyCode === 32) { this.move.height = 1 }
    }.bind(this)

    document.onkeyup = function (e) {
       if (e.keyCode === 39) { this.move.width = 0 }
       if (e.keyCode === 37) { this.move.width = 0 }
       if (e.keyCode === 38) { this.move.height = 0 }
       if (e.keyCode === 40) { this.move.height = 0 }
     }.bind(this)
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
