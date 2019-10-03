export class Trap {
  constructor(imageSrc, sizeFactor, position) {
    this.exists = true

    this.image = new Image()
    this.image.src = imageSrc
    this.viewDistance = 0

    this.position = position
    this.sizeFactor = sizeFactor || 1
  }

  update(spot) {

    this.instantInteract(spot)

  }

  instantInteract(spot) {
    spot.forEach((habitant) => {
      this.kill(habitant)
    })
  }

  operate(habitant) {
  }

  kill(habitant) {
    habitant.die && habitant.die()
  }

  setPosition(gridPosition) {
    this.position = gridPosition
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
}
