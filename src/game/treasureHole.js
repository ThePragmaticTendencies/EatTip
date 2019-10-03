export class TreasureHole {
  constructor(imageSrc, sizeFactor, position) {
    this.exists = true

    this.image = new Image()
    this.image.src = imageSrc
    this.viewDistance = 0

    this.position = position
    this.sizeFactor = sizeFactor || 1

    this.initialDepth = 10
    this.depth = this.initialDepth
    this.isDug = false
    this.treasureClaimed = false
  }

  instantInteract(habitant) {
  }

  interact() {
    this.revealTreasure()
  }

  operate() {
  }

  revealTreasure() {
    if (!this.isDug && this.depth > 0) {
      this.depth--

      if (this.depth > 0.95 * this.initialDepth) { this.image.src = "../src/assets/100_hole.png" }

      else if (this.depth > 0.74 * this.initialDepth) { this.image.src = "../src/assets/75_hole.png" }

      else if (this.depth > 0.48 * this.initialDepth) { this.image.src = "../src/assets/50_hole.png" }

      else if (this.depth > 0.23 * this.initialDepth) { this.image.src = "../src/assets/25_hole.png" }

      else { this.image.src = "../src/assets/0_hole.png" }

    } else if (!this.isDug) {
      this.isDug = true
      this.image.src = "../src/assets/treasure.png"
    }
  }

  claimTreasure() {
    if (this.isDug && !this.treasureClaimed) {
      this.treasureClaimed = true

      return this.isDug && this.treasureClaimed
    }
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
