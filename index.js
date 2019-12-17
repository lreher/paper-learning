var paper = require('paper')

// Canvas Setup
var canvas = document.getElementById('myCanvas')
screenWidth = 0
screenHeight = 0

// Dudes Setup
var myDudes = []
numberX = 20
numberY = 20

var sliderAttributes = {
  velX: 0,
  velY: 0,
  angle: Math.PI/2,
  length: 30
}

var velocityXSlider = document.getElementById("velocityXSlider")
velocityXSlider.oninput = function() {
  sliderDistribution = 10
  sliderAttributes.velX = velocityXSlider.value/sliderDistribution - 50/sliderDistribution
}

var velocityYSlider = document.getElementById("velocityYSlider")
velocityYSlider.oninput = function() {
  sliderDistribution = 10
  sliderAttributes.velY = velocityYSlider.value/sliderDistribution - 50/sliderDistribution
}

var angleSlider = document.getElementById("angleSlider")
angleSlider.oninput = function() {
  slideAngle = angleSlider.value * 1.8
  sliderAttributes.angle = slideAngle * (Math.PI/180)
}

var widthSlider = document.getElementById("widthSlider")
widthSlider.oninput = function() {
  sliderDistribution = 10

  for (i = 0; i < myDudes.length; i++) {
    myDudes[i].path.strokeWidth = widthSlider.value/sliderDistribution
  }
}

var lengthSlider = document.getElementById("lengthSlider")
lengthSlider.oninput = function() {
  sliderAttributes.length = lengthSlider.value
}

var resetDudes = document.getElementById("resetDudes")
resetDudes.onclick = function() {
  var dudeCount = 0

  for (i = 0; i < numberX; i++) {
    for (j = 0; j < numberY; j++) {
      var path = new paper.Path()
      path.strokeColor = 'black'
      path.strokeWidth = widthSlider.value/sliderDistribution

      myDude = myDudes[dudeCount]
      dudeCount += 1

      myDude.x = screenWidth/numberX * i,
      myDude.y = screenHeight/numberY * j
      myDude.path.remove()
      myDude.path = path
    }
  }
}

var resetScale = document.getElementById("resetScale")
resetScale.onclick = function() {

  velocityXSlider.value = 50
  velocityYSlider.value = 50
  angleSlider.value = 50
  widthSlider.value = 10
  lengthSlider.value = 10

  sliderAttributes.velX = 0
  sliderAttributes.velY = 0
  sliderAttributes.angle = Math.PI/2
}


function gameLoop() {
  for (i = 0; i < myDudes.length; i++) {
    myDude = myDudes[i]

    myDude.velX += myDude.accX
    myDude.velY += myDude.accY

    myDude.x += myDude.velX
    myDude.y += myDude.velY

    myDude.path.add(myDude.x, myDude.y)
    myDude.path.smooth()

    dx = myDude.x - screenWidth/2
    dy = myDude.y - screenHeight/2

    angle = Math.atan2(dx, dy) + sliderAttributes.angle

    myDude.velX = Math.cos(angle) * sliderAttributes.velX
    myDude.velY = -Math.sin(angle) * sliderAttributes.velY

    while (myDude.path.segments.length > lengthSlider.value/2) {
      myDude.path.segments.shift()
    }
  }

  requestAnimationFrame(gameLoop)
}

window.onload = function() {
  paper.setup(canvas)

  screenWidth = canvas.width/2
  screenHeight = canvas.height/2

  for (i = 0; i < numberX; i++) {
    for (j = 0; j < numberY; j++) {
      var path = new paper.Path()
      path.strokeColor = 'black'
      path.strokeWidth = 1

      myDude = {
        x: screenWidth/numberX * i,
        y: screenHeight/numberY * j,
        velX: 0,
        velY: 0,
        accX: 0,
        accY: 0,
        path: path
      }

      myDudes.push(myDude)
    }
  }

  requestAnimationFrame(gameLoop)

  paper.view.draw();
}
