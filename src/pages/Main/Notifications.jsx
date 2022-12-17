import useApi from '$api/useApi'
import User from '$slice/User'

import css from './Notifications.module.scss'
import NotificationsContent from '$components/Notifications'

const Notifications = () => {
  const api = useApi()

  const handleClearAll = async () => {
    const data = await api.delete('/notifications')
    if (!data) return
    $store(User.clearAllNoti())
  }

  return (
    <div className={css.Notifications}>
      <header className={css.Header}>
        <div className="wrapper">
          <div className={css.header}>
            <h6>Notifications</h6>
            <button onClick={handleClearAll}>Clear all</button>
          </div>
        </div>
      </header>

      <div className="wrapper">
        <NotificationsContent />
      </div>
    </div>
  )
}

export default Notifications
