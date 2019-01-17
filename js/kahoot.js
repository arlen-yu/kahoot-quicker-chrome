const RED = 'RED'
const BLUE = 'BLUE'
const GREEN = 'GREEN'
const YELLOW = 'YELLOW'

const COLOR_TO_KEY = {
  [RED]: 81,
  [BLUE]: 87,
  [YELLOW]: 69,
  [GREEN]: 82
}

const COLOR_TO_KEY_SANITIZED = {
  [RED]: 'Q',
  [BLUE]: 'W',
  [YELLOW]: 'E',
  [GREEN]: 'R'
}

let hasModifiedGameBlocks = false

function fetchColorMap() {
  const iframe = document.getElementById('gameBlockIframe')
  const innerFrame = iframe.contentDocument || iframe.contentWindow.document
  const all_buttons = innerFrame.getElementsByTagName('button')
  const colorMap = {}
  for (i = 0; i < all_buttons.length; i++) {
    const element = all_buttons[i]
    if (element.className.includes('triangle')) {
      colorMap[RED] = element
    } else if (element.className.includes('diamond')) {
      colorMap[BLUE] = element
    } else if (element.className.includes('circle')) {
      colorMap[YELLOW] = element
    } else if (element.className.includes('square')) {
      colorMap[GREEN] = element
    }
  }
  return colorMap
}

function click(color) {
  const button = fetchColorMap()[color]
  if (button) {
    button.click()
  } else {
    console.log('Invalid color: ${color}')
  }
}

function modifyButtonIcon() {
  const colorMap = fetchColorMap()
  for (const [key, value] of Object.entries(colorMap)) {
    const span = document.createElement('span')
    span.setAttribute('style', 'color: white; font-weight: bold; font-size: 50px')
    span.appendChild(document.createTextNode(COLOR_TO_KEY_SANITIZED[key]))
    value.replaceChild(span, value.childNodes[0])
  } 
}

// Shitty way to check for DOM changes
// Don't want to have to run a listener in the background since I want things to be as light as possible
function checkDOMChange() {
  if (window.location.href.includes('gameblock') && !hasModifiedGameBlocks) {
    hasModifiedGameBlocks = true
    modifyButtonIcon()
  } else {
    hasModifiedGameBlocks = false
  }
  setTimeout(checkDOMChange, 500)
}

document.documentElement.addEventListener("keyup", function(e) {
  if (window.location.href.includes('gameblock')) {
    if (e.keyCode === COLOR_TO_KEY[RED]) {
      click(RED)
    } else if (e.keyCode === COLOR_TO_KEY[BLUE]) {
      click(BLUE)
    } else if (e.keyCode === COLOR_TO_KEY[YELLOW]) {
      click(YELLOW)
    } else if (e.keyCode === COLOR_TO_KEY[GREEN]) {
      click(GREEN)
    }
  }
});

checkDOMChange()
