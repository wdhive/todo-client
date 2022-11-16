export const randomNumber = (max = 1, min = 0) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export const getFormData = (object) => {
  const formData = new FormData()
  Object.keys(object).forEach((key) => formData.append(key, object[key]))
  return formData
}
