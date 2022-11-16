import { useState } from 'react'
const loadingSymbol = Symbol('Loading')
const loadedSymbol = Symbol('loaded')

const useStatus = () => {
  const [status, setStatus] = useState()

  const isLoading = status === loadingSymbol
  const isLoadedWithNoError = status === loadedSymbol
  const hasError = isLoading || isLoadedWithNoError ? undefined : status

  return {
    hasError,
    isLoading,
    isLoaded: hasError ? true : isLoadedWithNoError,
    loadingSymbol,
    loadedSymbol,
    setStatus,
  }
}

export default useStatus
