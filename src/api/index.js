import axios from 'axios'
import subscribe from '$store/subscribe'
import extraSlice from '$slice/extra'
import userSlice from '$slice/user'

const instance = axios.create({
  baseURL: 'https://baby-todo.onrender.com',
  // baseURL: 'http://localhost:8000',
  headers: {
    common: {
      authorization: undefined,
      'exclude-socket': undefined,
    },
  },
})

let prevJwt = localStorage.getItem('jwt-token')
setInterval(() => {
  const jwt = localStorage.getItem('jwt-token')
  if (jwt === prevJwt) return

  if (jwt) {
    $store(userSlice.jwt(jwt))
  } else {
    $store(userSlice.logout())
  }
}, 1000)

subscribe(
  (state) => state.user.jwt,
  (token) => {
    instance.defaults.headers.common.authorization = token
      ? `Bearer ${token}`
      : undefined

    if (token) {
      prevJwt = token
      localStorage.setItem('jwt-token', token)
    } else {
      prevJwt = null
      localStorage.removeItem('jwt-token')
    }
  }
)

subscribe(
  (state) => state.user.socketId,
  (socketId) => {
    instance.defaults.headers.common['exclude-socket'] = socketId
  }
)

export default async (method, ...args) => {
  try {
    const response = await instance[method](...args)
    return [
      undefined,
      response.status === 204 ? true : response.data?.data || response.data,
    ]
  } catch (err) {
    const errorMessage = err.response?.data?.message || err.message

    if (err.response?.status === 401) {
      $store(
        extraSlice.alert({
          action: userSlice.logout(),
          message: errorMessage,
        })
      )
    }

    return [errorMessage, undefined]
  }
}
