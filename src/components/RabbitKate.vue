<template>
<div style="width: 900px; height: 500px; margin: 0 auto;">
  <canvas id="board" />
  <canvas id="canvas" />
</div>
</template>

<script>
import {
  Rabbit,
  Game
} from '../game/game.js'

export default {
  data: function() {
    return {}
  },
  computed: {},
  methods: {},
  created: function() {

  },
  mounted: function() {
    this.game = new Game('canvas', 'board')
    this.game.run()
  }
}
</script>
