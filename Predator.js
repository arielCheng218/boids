
class Predator {  

  constructor() {
    const randomCoords = getRandomCoords()
    this.viewRadius = 150
    this.maxSpeed = 1.5
    this.position = createVector(randomCoords[0], randomCoords[1])
    this.velocity = p5.Vector.random2D().mult(this.maxSpeed)
    this.acceleration = createVector(0, 0)
    this.maxForce = 2
  }

  edges() {
    if (this.position.x > getViewWidth()) {
      this.position.x = 0
    } else if (this.position.x <= 0) {
      this.position.x = getViewWidth()
    }
    if (this.position.y > getViewHeight() - 100) {
      this.position.y = 0
    } else if (this.position.y <= 0) {
      this.position.y = getViewHeight()
    }
  }

  getClosestBoidPosition(boids) {
    var closestBoidPosition = createVector()
    var smallestDistance = 100000
    for (var i = 0; i < boids.length; i++) {
        const distance = p5.Vector.dist(this.position, boids[i].position)
        if (distance < this.viewRadius && distance < smallestDistance) {
            smallestDistance = distance
            closestBoidPosition = boids[i].position
        }
    }
    return closestBoidPosition
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
    fill('#ff0000')
    push()
    // logic
    translate(this.position.x, this.position.y)
    rotate(this.velocity.heading())
    triangle(-15, -5, -15, 5, 5, 0)
    pop()
  }
}