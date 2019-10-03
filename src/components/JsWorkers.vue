<template>
<div class="row">
  <div class="col-md-12 demoCard">
    <button class="btn btn-outline-success" type="button" @click="runCalculations(5)">Run some complicate af.. calculations</button>
    <br />
    <span class="demoSpan">{{firstMessage}}</span>
  </div>
  <div class="col-md-12 demoCard">
    <button class="btn btn-outline-success" type="button" @click="runWorker()">Work complicate af.. calculations</button>
    <br />
    <span class="demoSpan">{{secondMessage}}</span>
  </div>
  <div class="col-md-12 demoCard">
    <button class="btn btn-outline-success" type="button" @click="registerInput()">I'input</button>
    <br />
    <span class="demoSpan">{{userMessage}}</span>
  </div>
</div>
</template>

<script>
export default {
  data: function() {
    return {
      worker: {},
      firstMessage: '',
      secondMessage: '',
      userMessage: 'Counting Clicks: 0',
      userCounter: 0
    }
  },
  methods: {
    initialiseWorker() {
      this.worker = new Worker('src/workers/background.js')

      this.worker.addEventListener('message', (e) => {
        this.alertCalculationsHaveFinished(e.data)
      }, false)
    },
    runCalculations(seconds) {
      this.clearMessages()
      var e = new Date().getTime() + (seconds * 1000)
      while (new Date().getTime() <= e) {}
      this.alertCalculationsHaveFinished('sync')
    },
    runWorker() {
      this.clearMessages()
      this.worker.postMessage('calc')
    },
    alertCalculationsHaveFinished(id) {
      debugger
      let message = 'Done!'
      switch (id) {
        case 'sync':
          this.firstMessage = message
          break
        case 'async':
          this.secondMessage = message
          break
      }
    },
    registerInput() {
      this.userCounter += 1
      this.userMessage = `Counting Clicks: ${this.userCounter}`
    },
    clearMessages() {
      this.firstMessage = ''
      this.secondMessage = ''
      this.userCounter = 0
      this.userMessage = 'Counting Clicks: 0'
    }
  },
  created: function() {
    this.initialiseWorker()
  },
  mounted: function() {

  }
}
</script>
