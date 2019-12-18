var paper = require('paper')

// Canvas Setup
var canvas = document.getElementById('myCanvas')
screenWidth = 0
screenHeight = 0

// Dudes Setup
var myDudes = []
dudeCount = 20

var sliderAttributes = {
  velX: 0,
  velY: 0,
  angle: Math.PI/2,
  length: 30
}
var sliderDistribution = 10

var velocityXSlider = document.getElementById("velocityXSlider")
velocityXSlider.oninput = function() {
  sliderAttributes.velX = velocityXSlider.value/sliderDistribution - 50/sliderDistribution
}

var velocityYSlider = document.getElementById("velocityYSlider")
velocityYSlider.oninput = function() {
  sliderAttributes.velY = velocityYSlider.value/sliderDistribution - 50/sliderDistribution
}

var angleSlider = document.getElementById("angleSlider")
angleSlider.oninput = function() {
  slideAngle = angleSlider.value * 1.8
  sliderAttributes.angle = slideAngle * (Math.PI/180)
}

var widthSlider = document.getElementById("widthSlider")
widthSlider.oninput = function() {

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
  var iterator = 0

  console.log(myDudes.length)

  for (i = 0; i < dudeCount; i++) {
    for (j = 0; j < dudeCount; j++) {
      var path = new paper.Path()
      path.strokeColor = 'black'
      path.strokeWidth = widthSlider.value/sliderDistribution

      myDude = myDudes[iterator]
      iterator += 1

      myDude.x = screenWidth/dudeCount * i,
      myDude.y = screenHeight/dudeCount * j
      myDude.path.remove()
      myDude.path = path
    }
  }
}

var fullReset = document.getElementById("fullReset")
fullReset.onclick = function() {
  dudeCount = document.getElementById("dudeCount").value

  createDudes()

  velocityXSlider.value = 50
  velocityYSlider.value = 50
  angleSlider.value = 50
  widthSlider.value = 10
  lengthSlider.value = 10

  sliderAttributes.velX = 0
  sliderAttributes.velY = 0
  sliderAttributes.angle = Math.PI/2
}

function createDudes() {
  console.log(myDudes.length)
  console.log(myDudes.length)

  for (i = 0; i < myDudes.length; i++) {
    myDudes[i].path.remove()
  }
  myDudes = []
  
  screenWidth = canvas.width/2
  screenHeight = canvas.height/2

  for (i = 0; i < dudeCount; i++) {
    for (j = 0; j < dudeCount; j++) {
      var path = new paper.Path()
      path.strokeColor = 'black'
      path.strokeWidth = widthSlider.value/sliderDistribution

      myDude = {
        x: screenWidth/dudeCount * i,
        y: screenHeight/dudeCount * j,
        velX: 0,
        velY: 0,
        accX: 0,
        accY: 0,
        path: path
      }

      myDudes.push(myDude)
    }
  }
}

//calc(100vh - 250px)
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
}

window.onload = function() {
  paper.setup(canvas)
  paper.view.draw();

  createDudes()
  setInterval(gameLoop, 50)
}
