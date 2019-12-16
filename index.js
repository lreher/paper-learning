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

      myDude.velX += Math.random() - 0.5
      myDude.velY += Math.random() - 0.5

      myDude.x += myDude.velX
      myDude.y += myDude.velY

      myDude.path.add(myDude.x, myDude.y)
      myDude.path.smooth()

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
        path: path
      }

      console.log(myDude)

      myDudes.push(myDude)
    }
  }

  requestAnimationFrame(gameLoop)

  paper.view.draw();
}
