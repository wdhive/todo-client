import { useCallback, useState } from 'react'

const useRerender = () => {
  const [, updateState] = useState()
  const forceUpdate = useCallback(() => updateState({}), [])
  return forceUpdate
}

export default useRerender
