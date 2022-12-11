import { useMemo } from 'react'
import { useSelector } from 'react-redux'

const useTaskPermission = (task) => {
  const userId = useSelector((state) => state.user.user?._id)

  return useMemo(() => {
    if (!task._id || userId === task.owner._id) {
      return {
        isOwner: true,
        isAdmin: true,
        isAss: true,
      }
    }

    const participants = task.participants.find((p) => p.user._id === userId)
    switch (participants.role) {
      case 'admin':
        return {
          isAdmin: true,
          isAss: true,
        }

      case 'assigner':
        return {
          isAss: true,
        }
    }
  }, [userId, task.owner?._id, task?.participants])
}

export default useTaskPermission
