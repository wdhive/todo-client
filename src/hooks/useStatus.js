import { useState } from 'react'

const useStatus = () => {
  const [status, setStatus] = useState()

  const isLoading = status === 'loading'
  const hasError = isLoading ? undefined : status

  return [
    hasError,
    isLoading,
    (state) => {
      setStatus(state)
      return status !== 'loading' && state
    },
  ]
}

export default useStatus
