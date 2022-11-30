const HTML = (body = '<div></div>') => {
  const parse = new DOMParser().parseFromString(body, 'text/html')
  return parse.body.firstElementChild
}

const Render = (innerHTML, css = {}) => {
  const container = HTML(innerHTML)

  const els = [...container.querySelectorAll('[class]')]
  if (container.matches('[class]')) {
    els.unshift(container)
  }

  els.forEach((el) => {
    const newClasses = []
    const classes = el.className.split(' ')
    classes.forEach((cls) => {
      if (cls.startsWith('*')) {
        return newClasses.push(cls.slice(1))
      }
      newClasses.push(css[cls] ?? '')
    })
    el.className = newClasses.join(' ')
  })

  document.getElementById('Uncontrolled-Root').appendChild(container)
  return container
}

export default Render
