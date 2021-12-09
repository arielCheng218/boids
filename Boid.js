
class Boid {
  
  constructor() {
    const randomCoords = getRandomCoords()
    this.desiredSeparation = 30
    this.maxSpeed = 2
    this.position = createVector(randomCoords[0], randomCoords[1])
    this.velocity = p5.Vector.random2D().mult(this.maxSpeed)
    this.acceleration = createVector(0, 0)
    this.maxForce = 10
  }

  // NOTE: 
  // - doesn't work when I use this.position.sub(boids[i].position)
  // - doesn't work if loop is for... of
  separate(boids) {
    var count = 0
    var steering = createVector(0, 0)
    // loop through boids to find if any are too close
    for (var i = 0; i < boids.length; i++) {
      const distance = p5.Vector.dist(this.position, boids[i].position)
      if ((distance < this.desiredSeparation) && (boids[i] != this)) {
        // too close; move away from boid
        var steerAwayVector = p5.Vector.sub(this.position, boids[i].position) // this line is the problem
        steerAwayVector.normalize()
        steerAwayVector.div(distance)
        steering.add(steerAwayVector)
        count++
      }
    }
    if (count > 0 && steering.mag() > 0) {
      steering.div(count)
      steering.normalize()
      steering.mult(this.maxSpeed)
      steering.sub(this.velocity)
      steering.limit(this.maxForce)
      this.acceleration.add(steering)
    }
  }

  align(boids) {

  }

  avoidWalls() {
    if (this.position.x > getViewWidth()) {
      this.position.x = getViewWidth()
      this.velocity.x *= -1
    } else if (this.position.x <= 0) {
      this.velocity.x *= -1
      this.position.x = 0
    }
    if (this.position.y > getViewHeight() - 100) {
      this.velocity.y *= -1
      this.position.y = getViewHeight() - 100
    } else if (this.position.y <= 0) {
      this.velocity.y *= -1
      this.position.y = 0
    }
  }

  update() {
    // update velocity
    this.velocity.add(this.acceleration)
    this.velocity.limit(this.maxSpeed)
    this.avoidWalls()
    // update position
    this.position.add(this.velocity)
    // clear acceleration
    this.acceleration.mult(0)
  }

  draw() {
    // graphics
    fill('#3faede')
    push()
    // logic
    translate(this.position.x, this.position.y)
    rotate(this.velocity.heading())
    triangle(-10, -5, -10, 5, 5, 0)
    pop()
  }

  flock(boids) {
    this.separate(boids)
    this.update()
    this.draw()
  }

}