import axios from 'axios'
import extraSlice from '$slice/extra'
import userSlice from '$slice/user'

export const baseURL = 'https://baby-todo.onrender.com'
// export const baseURL = 'http://localhost:8000'

export const instance = axios.create({
  baseURL,
  headers: {
    common: {
      authorization: undefined,
      'exclude-socket': undefined,
    },
  },
})

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
