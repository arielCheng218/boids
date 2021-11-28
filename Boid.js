
class Boid {

  constructor() {
    const randomCoords = getRandomCoords()
    this.desiredSeparation = 20
    this.maxSpeed = 4
    this.position = createVector(randomCoords[0], randomCoords[1])
    const randomStartingVelocity = getRandomNormalizedVector()
    this.velocity = createVector(randomStartingVelocity[0], randomStartingVelocity[1])
    this.velocity.setMag(this.maxSpeed)
    this.acceleration = createVector(0, 0)
  }

  updatePosition() {
    this.position.add(this.velocity)
  }

  updateVelocity(boids) {
    // separation
    this.separate(boids)
    // avoid obstacles
    this.avoidWalls()
    // alignment
    // coherence
  }

  updateAcceleration() {
    this.acceleration.mult(0)
  }

  separate(boids) {
    var count = 0
    var desiredVelocity = createVector(0, 0)
    // loop through boids to find if any are too close
    for (const boid of boids) {
      const distance = this.position.dist(boid.position)
      if ((distance < this.desiredSeparation) && (distance > 0)) {
        count += 1
        // too close; move away from boid
        var steerAwayVector = boid.position.sub(this.position)
        steerAwayVector.normalize()
        steerAwayVector.div(distance)
        desiredVelocity.add(steerAwayVector)
      }
    }
    if (count > 0) {
      desiredVelocity.div(count)
      desiredVelocity.normalize()
      desiredVelocity.mult(this.maxSpeed)
      this.acceleration = desiredVelocity.sub(this.velocity)
      this.acceleration.limit(1)
    }
  }

  avoidWalls() {
    if (this.position.x <= 0 || this.position.y <= 0 || this.position.x > getViewWidth() - 20 || this.position.y > getViewHeight() - 100) {
      this.velocity.mult(-1)
    }
  }

  update(boids) {
    this.velocity.add(this.acceleration)
    this.updateVelocity(boids)
    this.position.add(this.velocity)
    this.acceleration.mult(0)
  }

  draw(boids) {
    // graphics
    fill('#3faede')
    push()
    // logic
    translate(this.position.x, this.position.y)
    rotate(this.velocity.heading())
    triangle(-10, -5, -10, 5, 5, 0)
    pop()
    this.update(boids)
  }

}