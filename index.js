var paper = require('paper')

// Canvas Setup
var canvas = document.getElementById('myCanvas')
canvas.style.background = '#fff8e6'
canvas.width = 500
canvas.height = 600

function drawPath(path, x, y) {
  path.add(x, y)
}

window.onload = function() {
  paper.setup(canvas)

  var path = new paper.Path()
  path.strokeColor = 'black'

  canvas.addEventListener('mousemove', function(event) {
    drawPath(path, event.x, event.y)
  })

  paper.view.draw();
}
