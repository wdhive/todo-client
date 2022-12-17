import { useEffect, useId } from 'react'
window._$_custom_$_interval_$_manager_$_ ??= {}

const useInterval = (fn, timeOut) => {
  const id = useId()

  useEffect(() => {
    clearInterval(window._$_custom_$_interval_$_manager_$_[id])
    window._$_custom_$_interval_$_manager_$_[id] = setInterval(fn, timeOut)
    return () => clearInterval(window._$_custom_$_interval_$_manager_$_[id])
  }, [])
}

export default useInterval
