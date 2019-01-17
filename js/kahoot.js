function build_button_map(all_buttons) {
  const colors_to_button = {}
  for (i = 0; i < all_buttons.length; i++) {
    const element = all_buttons[i]
    if (element.className.includes('triangle')) {
      colors_to_button['red'] = element
    } else if (element.className.includes('diamond')) {
      colors_to_button['blue'] = element
    } else if (element.className.includes('circle')) {
      colors_to_button['yellow'] = element
    } else if (element.className.includes('square')) {
      colors_to_button['green'] = element
    }
  }
  return colors_to_button
}

function click(color) {
  const iframe = document.getElementById('gameBlockIframe')
  const inner_iframe = iframe.contentDocument || iframe.contentWindow.document
  const colors_to_button = build_button_map(inner_iframe.getElementsByTagName('button'))
  colors_to_button[color].click()
}

document.documentElement.addEventListener("keyup", function(e) {
  if (window.location.href.includes('gameblock')) {
    if (e.keyCode === 81) {
      click('red')
    } else if (e.keyCode === 87) {
      click('blue')
    } else if (e.keyCode === 69) {
      click('yellow')
    } else if (e.keyCode === 82) {
      click('green')
    }
  }
});