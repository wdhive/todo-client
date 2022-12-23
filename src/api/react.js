import userSlice from '$slice/User'
import ReactApi from 'use-react-api'
// import ReactApi from '../../use-react-api/dist-mjs'

export const baseURL = 'https://baby-todo.onrender.com'
// export const baseURL = 'http://localhost:8000'

const reactApi = ReactApi(
  {
    baseURL,
    headers: {
      common: {
        authorization: undefined,
        'exclude-socket': undefined,
      },
    },
  },
  {
    _getFail: (err) => {
      if (err.response?.status === 401) {
        $store(userSlice.jwt())
      }
    },
  }
)

export const { useSuspenseApiOnce, useApi, useApiOnce } = reactApi
export default reactApi
