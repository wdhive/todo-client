import { useMemo } from 'react'
import { useSelector } from 'react-redux'

const useTaskCollections = () => {
  const taskCollections = useSelector((state) => state.settings.collections)
  const collections = useMemo(
    () => [{ _id: 'none', name: 'none' }, ...taskCollections],
    [taskCollections]
  )

  return collections
}

export default useTaskCollections
