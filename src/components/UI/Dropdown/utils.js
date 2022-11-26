export const focusTo = function (container, element) {
  const eleTop = element.offsetTop
  const eleBottom = eleTop + element.clientHeight

  const containerTop = container.scrollTop
  const containerBottom = containerTop + container.clientHeight

  if (eleTop < containerTop) {
    element.scrollIntoView(true)
  } else if (eleBottom > containerBottom) {
    element.scrollIntoView(false)
  }
}