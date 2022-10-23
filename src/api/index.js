import axios from 'axios'
import store from '@store'
console.log(store)

const instance = axios.create({
  baseURL: 'https://young-coders-todo-app.herokuapp.com/v1',
  headers: {
    common: {
      authorization: localStorage.getItem('jwt-token'),
    },
  },
})

const axiosFactory =
  method =>
  async (...args) => {
    try {
      const { data } = await instance[method](...args)
      return [null, data.data || data]
    } catch (err) {
      return [err.response?.data?.message || err.message, null]
    }
  }

export const updateAuthToken = token => {
  instance.defaults.headers.common.authorization = token
  localStorage.setItem('jwt-token', token)
}
export const updateSocket = socketId => {
  instance.defaults.headers.common['exclude-socket'] = socketId
}

export default {
  get: axiosFactory('get'),
  post: axiosFactory('post'),
  delete: axiosFactory('delete'),
  patch: axiosFactory('patch'),
  put: axiosFactory('put'),
  updateAuthToken,
  updateSocket,
}
