export default (uniqueId, options) => {
  {
    if (!uniqueId) throw new Error('Must need an unique id')
    const generatedId =
      'warning___stay-away___register-once-related-issue___' + uniqueId

    const stateTarget = document.documentElement
    const alreadyRegistered = stateTarget.hasAttribute(generatedId)
    if (alreadyRegistered) return
    stateTarget.setAttribute(generatedId, '')
  }

  if (options instanceof Function) return options()

  if (Array.isArray(options.events)) {
    options.events.forEach((event) => {
      if (!event.type || !event.handler) {
        throw new Error('Event must have a handler and type.')
      }
      event.target ??= document
      event.target.addEventListener(event.type, event.handler)
    })
  }
}
