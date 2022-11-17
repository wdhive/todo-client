export const randomNumber = (max = 1, min = 0) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export const getFormData = (object) => {
  const formData = new FormData()
  Object.keys(object).forEach((key) => formData.append(key, object[key]))
  return formData
}

export const getInputs = (form) => {
  const inputs = [
    ...form.querySelectorAll('input[name]'),
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
