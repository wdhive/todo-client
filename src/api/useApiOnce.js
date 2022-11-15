import { useCallback, useEffect, useState } from 'react'
import useApi from './useApi'

const useApiOnce = (...args) => {
  const api = useApi()
  const [data, setData] = useState()

  const fetchFn = useCallback(async () => {
    setData()
    const data = await api.fetch(...args)
    setData(data)
  }, [])

  useEffect(() => {
    fetchFn()
  }, [])

  return {
    data,
    retry: fetchFn,
    error: api.error,
    loading: api.loading,
  }
}

export default useApiOnce
