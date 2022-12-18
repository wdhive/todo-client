import { useCallback } from 'react'
import api from './index'
import useStatus from '$hooks/useStatus'

const useApi = ( ) => {
  const {
    hasError,
    isLoading,
    isLoaded,
    loadingSymbol,
    loadedSymbol,
    setStatus,
  } = useStatus( )

  const reset = () => setStatus()
  const fetch = useCallback(async (method, ...args) => {
    setStatus(loadingSymbol)

    const [err, data] = await api(method.toLowerCase(), ...args)

    if (err) {
      return setStatus(err)
    } else {
      setStatus(loadedSymbol)
    }

    return data
  }, [])

  return {
    loaded: isLoaded,
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
