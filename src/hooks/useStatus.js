import { useState } from 'react'

const useStatus = () => {
  const [status, setStatus] = useState(null)

  const isLoading = status === 'loading'
  const hasError = !isLoading && status

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
