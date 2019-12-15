var paper = require('paper')

// Canvas Setup
var canvas = document.getElementById('myCanvas')
canvas.style.background = '#fff8e6'
canvas.width = 500
canvas.height = 500

function drawPath(path, x, y) {
  path.add(x, y)
  path.smooth()

  if (path.segments.length > 30) {
    path.segments.shift()
  }
}

window.onload = function() {
  paper.setup(canvas)

  var path = new paper.Path()
  path.strokeColor = 'black'

  canvas.addEventListener('mousemove', function(event) {
    console.log(event)
    drawPath(path, event.offsetX, event.offsetY)
  })

  paper.view.draw();
}
