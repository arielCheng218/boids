
class Predator {  

  constructor() {
    const randomCoords = getRandomCoords()
    this.viewRadius = 150
    this.state = "n" // n, b, r, s | normal, burst, rest, stealth
    this.maxSpeed = 1.5
    this.position = createVector(randomCoords[0], randomCoords[1])
    this.velocity = p5.Vector.random2D().mult(this.maxSpeed)
    this.acceleration = createVector(0, 0)
    this.maxForce = 2
    this.currentlyResting = false
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

  getClosestBoidPosition(boids) {
    var closestBoidPosition = createVector()
    var smallestDistance = 1000000000
    for (var i = 0; i < boids.length; i++) {
        const distance = p5.Vector.dist(this.position, boids[i].position)
        if (distance < this.viewRadius && distance < smallestDistance) {
            smallestDistance = distance
            closestBoidPosition = boids[i].position
        }
    }
    if (smallestDistance != 1000000000) {
      return closestBoidPosition
    } else {
      return null
    }
  }

  seekBoid(closestBoidPosition) {
    const steer = p5.Vector.sub(closestBoidPosition, this.velocity)
    steer.limit(this.maxForce * 1.5)
    return steer
  }

  update(boids) {
    // seek closest boid if there is one
    const closestBoidPosition = this.getClosestBoidPosition(boids)
    if (closestBoidPosition != null) {
      const seek = this.seekBoid(closestBoidPosition)
      this.acceleration.add(seek)
      this.state = "b"
      wait(3000).then(() => {
        this.state = "r"
        this.currentlyResting = true
      }) 
      wait(5000).then(() => {
        this.state = "n"
        this.currentlyResting = false
      })
      this.state = "n"
    }
    // update max speed based on state
    if (this.state == "n") {
      this.maxSpeed = 1.5
    } else if (this.state == "b") {
      this.maxSpeed = 3
    } else if (this.state == "r") {
      this.maxSpeed = 0
    }
    // update velocity
    this.velocity.add(this.acceleration)
    this.velocity.setMag(this.maxSpeed)
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