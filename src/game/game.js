import { World } from '../game/world.js'
import { Hole } from '../game/hole.js'
import { TreasureHole } from '../game/treasureHole.js'
import { Trap } from '../game/trap.js'
import { Fox } from '../game/fox.js'
import { Bunny } from '../game/bunny.js'

export class Game {
  constructor (containerId, boardId) {
    this.bunnyName = 'Kasia'

    this.width = 800
    this.boardWidth = this.width

    this.height = 500
    this.boardHeight = 100

    this.gridSize = 50
    this.lastRender = 0

    this.canvas = document.getElementById(containerId)
    this.canvas.width = this.width
    this.canvas.height = this.height

    this.boardCanvas = document.getElementById(boardId)
    this.boardCanvas.width = this.boardWidth
    this.boardCanvas.height = this.boardHeight

    this.context = this.canvas.getContext('2d')
    this.boardContext = this.boardCanvas.getContext('2d')

    this.World = new World(this.width/this.gridSize, this.height/this.gridSize, this.gridSize)

    this.populateWorld()

    this.maxFps = 40

    this.foundTreasures = 0
    this.prizeImages = []
    this.treasuresToWin = 5

    this.gameOver = false
    this.won = undefined

    this.timeToRespawn = 30
    this.respawnCounter = 0

    this.lostGames = 0
  }

  update() {
    let isBunnyAlive = false
    let worldObjects = this.World.getWorldObjectsNames()

    worldObjects.forEach((worldObjectName) => {
      let worldObject = this.World.worldObjects[worldObjectName]

      let habitant = worldObject.habitant
      let position = habitant.position
      let surrounding = worldObject.surrounding

      habitant.update && habitant.update(this.World.getFromSpot(position), surrounding)

      if (!this.won && habitant.claimTreasure && habitant.claimTreasure()) {
        this.foundTreasures++

        let prizeImage = new Image()
        prizeImage.src = "../src/assets/treasure.png"

        this.prizeImages.push(prizeImage)
        this.won = this.foundTreasures >= this.treasuresToWin
        this.gameOver = this.won
      }

      isBunnyAlive = !isBunnyAlive && (worldObjectName === this.bunnyName)
    })

    if (!isBunnyAlive) {
      this.resetGame()
      this.reloadWorld()
    }

    this.World.update()
  }

  render() {
    let context = this.context
    let canvasWidth = this.canvas.width
    let canvasHeight = this.canvas.height

    this.renderBoard()

    if (!this.won) {
      context.clearRect(0, 0, this.width, this.height)

      let worldObjectNames = this.World.getWorldObjectsNames()

      worldObjectNames.forEach((worldObjectName) => {
        let worldObject = this.World.worldObjects[worldObjectName]
        worldObject.habitant.render(context, this.scale.bind(this))
      })
    } else {
      let offset = 20
      let width = this.width
      let height = this.height

      context.clearRect(0, 0, width, height)

      context.font = "30px Arial"
      context.fillStyle = "#aad400"
      context.fillRect(offset, offset, width - 2*offset, height - 2*offset)

      context.fillStyle = "red"
      context.textAlign = "left"

      context.fillText("No to wygralaś to Myszo! Piona!", 2*offset, 4*offset)
      context.fillText("Multikino Katowice | Środa, 24.04.2019 17:20 | Sala 2", 2*offset, 6*offset)
      context.fillText("Zobaczysz z Mamą:) -> To My", 2*offset, 8*offset)
      context.fillText("Uuuu...", 2*offset, 10*offset)
    }
  }

  loop(timestamp) {
    if (timestamp < this.lastRender + (1000/this.maxFps)) {
      window.requestAnimationFrame(this.loop.bind(this))
      return
    }
    let progress = timestamp - this.lastRender

    this.lastRender = timestamp

    this.update()

    this.render()

    window.requestAnimationFrame(this.loop.bind(this))
  }

  run() {
    window.requestAnimationFrame(this.loop.bind(this))
  }

  renderBoard() {
    let context = this.boardContext
    let treasures = this.treasuresToWin
    let treasuresGot = this.prizeImages

    let textWidth = 300
    let textPosition = 10
    let verticalMargin = 10
    let imageGap = 5

    let boardWidth = this.boardWidth
    let boardHeight = this.boardHeight

    let prizeBoardWidth = boardWidth - 2*verticalMargin - textWidth
    let prizeImageDimension = Math.floor((prizeBoardWidth - treasures*imageGap)/treasures)
    prizeImageDimension = prizeImageDimension < this.boardHeight ? prizeImageDimension : this.boardHeight

    context.clearRect(0, 0, boardWidth, boardHeight)

    context.font = "30px Arial"
    context.fillStyle = "red"
    context.textAlign = "left"

    context.fillText("#śmierćkrólikom: " + this.lostGames, textPosition, this.boardCanvas.height/2 + verticalMargin)

    for (let i = 0; i < treasuresGot.length; i++) {
      let imageGap = 2
      let imagePosition = boardWidth - verticalMargin - ((i+1) * prizeImageDimension) - (i * imageGap )
      context.drawImage(treasuresGot[i], imagePosition, (boardHeight-prizeImageDimension)/2, prizeImageDimension, prizeImageDimension)
      debugger
    }
  }

  populateWorld() {
    let treasures = 1
    let holes = 1
    let traps = 20
    let foxes = 3

    for (let i=0; i < treasures; i++) {
      this.World.addHabitant(`Treasure_${i}`, new TreasureHole("../src/assets/hole.png", 0.85))
    }

    for (let i=0; i < holes; i++) {
      this.World.addHabitant(`Hole_${i}`, new Hole("../src/assets/hole.png", 0.85))
    }

    for (let i=0; i < traps; i++) {
      this.World.addHabitant(`Trap_${i}`, new Trap("../src/assets/trap.png", 0.75))
    }

    for (let i=0; i < foxes; i++) {
      this.World.addHabitant(`Fox_${i}`, new Fox("../src/assets/catto.png"))
    }

    this.spawnBunny()
  }

  getBunny() {
    return new Bunny("../src/assets/bunny.png", 0.8)
  }

  spawnBunny(respawn) {
    this.World.addHabitant(this.bunnyName, this.getBunny())
  }

  reloadWorld() {
    this.respawnCounter++

    if (this.respawnCounter >= this.timeToRespawn) {
      this.World.loadWorld()
      this.populateWorld()
      this.respawnCounter = 0
      this.lostGames++
    }
  }

  resetGame() {
    this.foundTreasures = 0
    this.prizeImages = []
  }

  scale(value) {
    return this.gridSize * value
  }
}
