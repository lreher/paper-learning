var paper = require('paper')

// Canvas Setup
var canvas = document.getElementById('myCanvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

var myDudes = []
var frame = 0

function gameLoop() {
  frame += 1

  // Lets control the framerate
  if (frame % 1 === 0) {
    for (i = 0; i < myDudes.length; i++) {
      myDude = myDudes[i]

      myDude.velX += (Math.random() + myDude.accXdisposition) - 0.5
      myDude.velY += (Math.random() + myDude.accYdisposition) - 0.5

      myDude.x += myDude.velX
      myDude.y += myDude.velY

      myDude.path.add(myDude.x, myDude.y)
      myDude.path.smooth()

      dx = myDude.x - canvas.width/2
      dy = myDude.y - canvas.height/2

      angle = Math.atan2(dx, dy)

      myDude.accXdisposition = Math.cos(angle)
      myDude.accYdisposition = Math.sin(angle)

      // if (myDude.x > window.innerWidth) {
      //   myDude.accXdisposition = -0.25
      // } else if (myDude.x < 0) {
      //   myDude.accXdisposition = 0.25
      // } else {
      //   myDude.accXdisposition = 0
      // }
      //
      // if (myDude.y > window.innerHeight) {
      //   myDude.accYdisposition = -0.25
      // } else if (myDude.y < 0) {
      //   myDude.accYdisposition = 0.25
      // } else {
      //   myDude.accYdisposition = 0
      // }

      if (myDude.path.segments.length > 30) {
        myDude.path.segments.shift()
      }
    }
  }

  requestAnimationFrame(gameLoop)
}

window.onload = function() {
  paper.setup(canvas)

  numberX = 20
  numberY = 20

  for (i = 0; i < numberX; i++) {
    for (j = 0; j < numberY; j++) {
      var path = new paper.Path()
      path.strokeColor = 'black'
      path.strokeWidth = 3

      myDude = {
        x: canvas.width/numberX * i,
        y: canvas.height/numberY * j,
        velX: 0,
        velY: 0,
        accXdisposition: 0,
        accYdisposition: 0,
        path: path
      }

      console.log(myDude)

      myDudes.push(myDude)
    }
  }

  requestAnimationFrame(gameLoop)

  paper.view.draw();
}
