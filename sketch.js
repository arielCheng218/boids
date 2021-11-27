
// init
function setup() {
  view_width = getViewWidth()
  view_height = getViewHeight()
  createCanvas(view_width - 20, view_height - 100)
  boid = new Boid()
}

// main loop
function draw() {
  background('#000000')
  boid.draw()
}