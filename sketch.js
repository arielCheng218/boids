
// init
function setup() {
  viewWidth = getViewWidth()
  viewHeight = getViewHeight()
  createCanvas(viewWidth, viewHeight)
  boids = createBoids()
  // predator = createPredators()
}

function createBoids() {
  boids = []
  for (var i = 0; i < 200; i++) {
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
  // predator.update(boids)
  // predator.draw()
  for (var boid of boids) {
    boid.flock(boids)
    boid.update()
    boid.edges()
    boid.draw()
  }
}