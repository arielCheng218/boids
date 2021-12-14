
function getViewWidth() {
  return Math.max(document.documentElement.clientWidth + 10 || 0, window.innerWidth + 10 || 0)
}

function getViewHeight() {
  return Math.max(document.documentElement.clientHeight + 10 || 0, window.innerHeight + 10 || 0)
}

function getRandomCoords() {
  return [getRandomInt(0, getViewWidth() - 50), getRandomInt(0, getViewHeight())]
} 

function getRandomInt(min, max) {
  return Math.random() * (max - min) + min;
}

function getRandomNormalizedVector() {
  theta = 2.0 * Math.PI * Math.random()
  return [Math.cos(theta), Math.sin(theta)]
}

const wait = time => new Promise((resolve) => setTimeout(resolve, time))