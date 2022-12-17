import { useEffect } from 'react'

const useInterval = (handler, timeOut) => {
  useEffect(() => {
    const interval = setInterval(handler, timeOut)
    return () => clearInterval(interval)
  }, [])
}

export default useInterval
