export const randomNumber = (max = 1, min = 0) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export const setLocalStroage = (key, data = null) => {
  if (data === null) {
    return localStorage.removeItem(key)
  }
  localStorage.setItem(key, data)
}

export const getFormData = (object) => {
  const formData = new FormData()
  for (key in object) formData.append(key, object[key])
  return formData
}

export const getInputs = (form) => {
  const inputs = [
    ...form.querySelectorAll('input[name]:not([type="radio"])'),
    ...form.querySelectorAll('input[name][type="radio"]:checked'),
    ...form.querySelectorAll('textarea[name]'),
  ]
  const values = {}
  const elements = {}

  inputs.forEach((input) => {
    const name = input.name
    if (!name) return
    const value =
      input.type === 'file'
        ? input.files
        : input.type === 'date'
        ? input.value && new Date(input.value)
        : input.value

    values[name] = value
    elements[name] = input
  })

  return [values, elements, form]
}

export const getDiff = (base, data) => {
  const result = {}

  for (let key in data) {
    const dataValue = data[key]
    const baseValue = base[key]

    if (baseValue !== dataValue) {
      result[key] = dataValue
    }
  }

  return result
}

export const isNotEmptyObject = (o) => {
  return Object.keys(o).length !== 0
}
