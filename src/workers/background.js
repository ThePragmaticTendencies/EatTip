this.addEventListener('message', function(e) {
    switch(e.data) {
        case 'calc':
        let e = new Date().getTime() + (5000)
        while (new Date().getTime() <= e) {}

        this.postMessage('async')
          break
    }
}, false)
