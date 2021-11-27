
class Boid {

  constructor() {
    const randomCoords = getRandomCoords()
    // position
    this.pointsPositions = getInitialPoints(randomCoords)
    this.position = createVector(randomCoords[0], randomCoords[1])
    // velocity
    const randomStartingVelocity = getRandomNormalizedVector()
    this.velocity = createVector(randomStartingVelocity[0], randomStartingVelocity[1])
  }

  updatePosition() {
    this.position.add(this.velocity)
  }

  // updatePointsPositions() {
  //   for (var i = 0; i < this.pointsPositions.length; i++) {
  //     if (i % 2 == 0) {
  //       if ((this.pointsPositions[i] + this.velocity.x) < getViewWidth() && (this.pointsPositions[i] + this.velocity.x) > 0) {
  //         this.pointsPositions[i] += this.velocity.x
  //       } else {
  //         this.pointsPositions = [0, 30, 10, 0, 20, 30]
  //       }
  //     } else {
  //       if ((this.pointsPositions[i] + this.velocity.y) < getViewHeight() && (this.pointsPositions[i] + this.velocity.y) > 0) {
  //         this.pointsPositions[i] += this.velocity.y
  //       } else {
  //         this.pointsPositions = [0, 30, 10, 0, 20, 30]
  //       }
  //     }
  //   }
  // }

  draw() {
    translate(this.position.x, this.position.y)
    rotate(this.velocity.heading())
    triangle(0, 30, 10, 0, 20, 30)
    this.updatePosition()
    this.updatePointsPositions()
  }
}

function getInitialPoints(randomCoords) {
  initialPoints = [0, 30, 10, 0, 20, 30]
  for (var i = 0; i < initialPoints.length; i++) {
    if (i % 2 == 0) {
      initialPoints[i] += randomCoords[0]
    } else {
      initialPoints[i] += randomCoords[1]
    }
  }
  return initialPoints
}