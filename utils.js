
function getViewWidth() {
  return Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
}

function getViewHeight() {
  return Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
}

function getRandomCoords() {
  return [getRandomInt(0, getViewWidth() - 50), getRandomInt(0, getViewHeight() - 50)]
} 

function getRandomInt(min, max) {
  return Math.random() * (max - min) + min;
}

function getRandomNormalizedVector() {
  theta = 2.0 * Math.PI * Math.random()
  return [Math.cos(theta), Math.sin(theta)]
}