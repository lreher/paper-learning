var paper = require('paper')

window.onload = function() {
  var canvas = document.getElementById('myCanvas')

  paper.setup(canvas)

  var path = new paper.Path();
  path.strokeColor = 'black'

  var start = new paper.Point(100, 100)
  path.moveTo(start)
  path.lineTo(start.add([200, 200]))

  paper.view.draw();
}

// var myPath = new paper.Path()
// myPath.strokeColor = 'black'
// myPath.add(new paper.Point(0, 0), new paper.Point(100, 100))
