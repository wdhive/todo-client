import { useState } from 'react'
export const loadingSymbol = Symbol('Loading')
export const loadedSymbol = Symbol('Loaded')

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
