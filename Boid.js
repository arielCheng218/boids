
class Boid {
  
  constructor() {
    const randomCoords = getRandomCoords()
    this.desiredSeparation = 20
    this.maxSpeed = 4
    this.position = createVector(randomCoords[0], randomCoords[1])
    const randomStartingVelocity = getRandomNormalizedVector()
    this.velocity = createVector(randomStartingVelocity[0], randomStartingVelocity[1]).setMag(this.maxSpeed)
    this.acceleration = createVector(0, 0)
    this.maxForce = 0.1
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

  applyForce(force) {
    this.acceleration.add(force)
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
        this.drawArrow(steerAwayVector, this.position, '#eb9ac1')
        steerAwayVector.normalize()
        steerAwayVector.div(distance)
        desiredVelocity.add(steerAwayVector)
      }
    }
    if (count > 0) {
      desiredVelocity.setMag(this.maxSpeed)
      var steer = desiredVelocity.sub(this.velocity)
      steer.limit(this.maxForce)
      this.applyForce(steer)
    }
  }

  avoidWalls() {
    if (this.position.x > getViewWidth()) {
      this.position.x = getViewWidth()
      this.velocity.x *= -1
    } else if (this.position.x < 0) {
      this.velocity.x *= -1
      this.position.x = 0
    }
    if (this.position.y > getViewHeight() - 100) {
      this.velocity.y *= -1
      this.position.y = getViewHeight() - 100
    } else if (this.position.y < 0) {
      this.velocity.y *= -1
      this.position.y = 0
    }
  }

  update(boids) {
    // update velocity
    this.separate(boids)
    this.avoidWalls()
    this.velocity.add(this.acceleration)
    this.velocity.limit(this.maxSpeed)
    // update position
    this.position.add(this.velocity)
    // clear acceleration
    this.acceleration.mult(0)
  }

  draw(boids) {
    // graphics
    fill('#3faede')
    this.update(boids)
    push()
    // logic
    translate(this.position.x, this.position.y)
    rotate(this.velocity.heading())
    triangle(-10, -5, -10, 5, 5, 0)
    pop()
  }

}