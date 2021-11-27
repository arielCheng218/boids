
class Boid {

  constructor() {
    const randomCoords = getRandomCoords()
    // position
    this.position = createVector(randomCoords[0], randomCoords[1])
    // velocity
    const randomStartingVelocity = getRandomNormalizedVector()
    this.velocity = createVector(randomStartingVelocity[0], randomStartingVelocity[1])
  }

  updatePosition() {
    this.position.add(this.velocity)
  }

  draw() {
    // graphics
    fill('#3faede');
    // logic
    this.updatePosition()
    translate(this.position.x, this.position.y)
    rotate(this.velocity.heading())
    triangle(-15, -8, -15, 8, 8, 0)
  }
}