import { useSelector } from 'react-redux'
import css from './Notifications.module.scss'
import NotificationsContent from '$components/Notifications'

const Notifications = () => {
  const notifications = useSelector((state) => state.user.notifications)

  return (
    <div className={css.Notifications}>
      <header className={css.Header}>
        <div className="wrapper">
          <div className={css.header}>
            <h6>Notifications</h6>
            <button>Clear all</button>
          </div>
        </div>
      </header>

      <div className="wrapper">
        <NotificationsContent notifications={notifications} />
      </div>
    </div>
  )
}

export default Notifications
