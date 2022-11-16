import { useCallback } from 'react'
import api from './index'
import useStatus from '$hooks/useStatus'

const useApi = () => {
  const [hasError, isLoading, setStatus] = useStatus()

  const reset = useCallback(() => setStatus())
  const fetch = useCallback(async (method, ...args) => {
    setStatus('loading')
    const [err, data] = await api(method.toLowerCase(), ...args)
    if (setStatus(err)) return
    return data
  })

  return {
    loading: isLoading,
    error: hasError,
    setStatus,
    reset,
    fetch,
    get(...args) {
      return fetch('get', ...args)
    },
    post(...args) {
      return fetch('post', ...args)
    },
    delete(...args) {
      return fetch('delete', ...args)
    },
    patch(...args) {
      return fetch('patch', ...args)
    },
    put(...args) {
      return fetch('put', ...args)
    },
  }
}

export default useApi
