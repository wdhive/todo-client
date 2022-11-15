import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://young-coders-todo-app.herokuapp.com/v1',
  headers: {
    common: {
      authorization: localStorage.getItem('jwt-token'),
    },
  },
})

export const updateAuthToken = (token) => {
  instance.defaults.headers.common.authorization = token
  localStorage.setItem('jwt-token', token)
}
export const updateSocket = (socketId) => {
  instance.defaults.headers.common['exclude-socket'] = socketId
}

export default async (method, ...args) => {
  try {
    const { data } = await instance[method](...args)
    return [undefined, data.data || data]
  } catch (err) {
    return [err.response?.data?.message || err.message, undefined]
  }
}
