import { useCallback, useEffect, useState } from 'react'
import useApi from './useApi'

const useApiOnce = (...args) => {
  let onDataLoad = () => {}
  const api = useApi()
  const [data, setData] = useState()

  const fetchFn = useCallback(async () => {
    setData()
    const data = await api.fetch(...args)
    setData(data)
    onDataLoad(data)
  }, [])

  useEffect(() => {
    fetchFn()
  }, [])

  return {
    data,
    retry: fetchFn,
    error: api.error,
    loading: api.loading,
    onLoad: (fn) => {
      onDataLoad = fn
    },
  }
}

export default useApiOnce
