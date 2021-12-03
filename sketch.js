
// init
function setup() {
  viewWidth = getViewWidth()
  viewHeight = getViewHeight()
  createCanvas(viewWidth - 20, viewHeight - 100)
  boids = createBoids()
}

function createBoids() {
  boids = []
  for (var i = 0; i < 20; i++) {
    boids.push(new Boid(i))
  }
  return boids
}

// main loop
function draw() {
  background('#000000')
  for (var boid of boids) {
    boid.update(boids)
    boid.draw()
  }
}