import { memo } from 'react'
import { useSelector } from 'react-redux'

import ListItem from './ListItem'

const NotificationsContent = () => {
  const notifications = useSelector((state) => state.user.notifications)

  return (
    <div>
      {[...notifications].reverse().map((n) => (
        <ListItem key={n._id} notification={n} />
      ))}
    </div>
  )
}

export default memo(NotificationsContent)
