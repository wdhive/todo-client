import { useState } from 'react'
const loadingSymbol = Symbol('Loading')
const loadedSymbol = Symbol('Loading')

const useStatus = () => {
  const [status, setStatus] = useState()

  const isLoading = status === loadingSymbol
  const hasError = isLoading ? undefined : status
  const isLoaded = hasError ? true : status === loadedSymbol

  return {
    hasError,
    isLoading,
    isLoaded,
    loadingSymbol,
    loadedSymbol,
    setStatus,
  }
}

export default useStatus
