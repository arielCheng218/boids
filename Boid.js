
class Boid {
  
  constructor() {
    const randomCoords = getRandomCoords()
    this.desiredSeparation = 20
    this.viewRadius = 30
    this.maxSpeed = 3
    this.position = createVector(randomCoords[0], randomCoords[1])
    this.velocity = p5.Vector.random2D().mult(this.maxSpeed)
    this.acceleration = createVector(0, 0)
    this.maxForce = 0.15
  }

  // NOTE: 
  // - doesn't work when I use this.position.sub(boids[i].position)
  // - doesn't work if loop is for... of
  separate(boids) {
    var count = 0
    var sum = createVector(0, 0)
    // loop through boids to find if any are too close
    for (var i = 0; i < boids.length; i++) {
      const distance = p5.Vector.dist(this.position, boids[i].position)
      if ((distance < this.desiredSeparation) && (boids[i] != this) && (distance != 0)) {
        // too close; move away from boid
        var steerAwayVector = p5.Vector.sub(this.position, boids[i].position) 
        steerAwayVector.normalize()
        steerAwayVector.div(distance)
        sum.add(steerAwayVector)
        count++
      }
    }
    if (count > 0 && sum.mag() > 0) {
      sum.div(count)
      sum.normalize()
      sum.mult(this.maxSpeed)
      const steer = p5.Vector.sub(sum, this.velocity)
      steer.limit(this.maxForce)
      return steer
    } else {
      return createVector(0, 0)
    }
  }

  align(boids) {
    var sum = createVector()
    var count = 0
    for (var i = 0; i < boids.length; i++) {
      const distance = p5.Vector.dist(this.position, boids[i].position)
      if (distance < this.viewRadius && boids[i] != this) {
        sum.add(boids[i].velocity)
        count++
      }
    }
    if (count > 0) {
      sum.div(count)
      sum.normalize()
      sum.mult(this.maxSpeed)
      const steer = p5.Vector.sub(sum, this.velocity)
      steer.limit(this.maxForce)
      return steer
    } else {
      return createVector(0, 0)
    }
  }

  drawArrow(base, vec, myColor) {
    push();
    stroke(myColor);
    strokeWeight(3);
    fill(myColor);
    translate(base.x, base.y);
    line(0, 0, vec.x, vec.y);
    rotate(vec.heading());
    let arrowSize = 7;
    translate(vec.mag() - arrowSize, 0);
    triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
    pop();
  }

  cohesion(boids) {
    var sum = createVector()
    var count = 0
    for (var i = 0; i < boids.length; i++) {
      const distance = p5.Vector.dist(this.position, boids[i].position)
      if (distance < this.viewRadius && boids[i] != this) {
        sum.add(boids[i].position)
        count++
      }
    }
    if (count > 0) {
      sum.div(count)
      const desired = p5.Vector.sub(sum, this.position)
      desired.normalize()
      desired.mult(this.maxSpeed)
      const steer = p5.Vector.sub(desired, this.velocity)
      return steer
    } else {
      return createVector(0, 0)
    }
  }

  fleePredator(predator) {
    const distance = p5.Vector.dist(this.position, predator.position)
    if (distance < this.viewRadius) {
      var steerAwayVector = p5.Vector.sub(this.position, predator.position)
      const steer = p5.Vector.sub(steerAwayVector, this.velocity)
      steer.limit(this.maxForce)
      return steer
    } else {
      return createVector(0, 0)
    }
  }

  edges() {
    if (this.position.x > getViewWidth()) {
      this.position.x = 0
    } else if (this.position.x <= 0) {
      this.position.x = getViewWidth()
    }
    if (this.position.y > getViewHeight()) {
      this.position.y = 0
    } else if (this.position.y <= 0) {
      this.position.y = getViewHeight()
    }
  }

  update() {
    // update velocity
    this.velocity.add(this.acceleration)
    this.velocity.limit(this.maxSpeed)
    this.edges()
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

  checkIfDead(predatorPosition) {
    if (p5.Vector.dist(this.position, predatorPosition)) {
      return true
    } else {
      return false
    }
  }

  flock(boids) {
    const align = this.align(boids)
    const separation = this.separate(boids)
    const cohesion = this.cohesion(boids)
    // const flee = this.fleePredator(predator)
    this.acceleration.add(separation)
    this.acceleration.add(align)
    this.acceleration.add(cohesion.mult(0.03))
    // this.acceleration.add(flee)
  }
}