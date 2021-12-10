
// init
function setup() {
  viewWidth = getViewWidth()
  viewHeight = getViewHeight()
  createCanvas(viewWidth - 20, viewHeight - 100)
  boids = createBoids()
  predator = createPredators()
}

function createBoids() {
  boids = []
  for (var i = 0; i < 100; i++) {
    boids.push(new Boid())
  }
  return boids
}

function createPredators() {
  predator = new Predator()
  return predator
}

// main loop
function draw() {
  background('#000000')
  for (var boid of boids) {
    boid.flock(boids)
  }
  predator.update()
  predator.draw()
}