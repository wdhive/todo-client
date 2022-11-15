import axios from 'axios'
import store from '@store'

const instance = axios.create({
  baseURL: 'https://young-coders-todo-app.herokuapp.com/v1',
  headers: {
    common: {
      authorization: localStorage.getItem('jwt-token'),
    },
  },
})

const updateHeaders = () => {
  const state = store.getState()

  const token = state.user.jwt
  instance.defaults.headers.common.authorization = token
  if (token) {
    localStorage.setItem('jwt-token', token)
  } else {
    localStorage.removeItem('jwt-token')
  }

  const socketId = state.user.socketId
  instance.defaults.headers.common['exclude-socket'] = socketId
}

updateHeaders()
store.subscribe(() => updateHeaders())

export default async (method, ...args) => {
  try {
    const { data } = await instance[method](...args)
    return [undefined, data.data || data]
  } catch (err) {
    return [err.response?.data?.message || err.message, undefined]
  }
}
