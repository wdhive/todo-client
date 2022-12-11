import { useMemo } from 'react'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import User from '$slice/User'
import useApi from '$api/useApi'
import css from './ListItem.module.scss'
import Modal from '$ui/Uncontrolled/Modal'

const ListItem = ({ notification }) => {
  const api = useApi()

  const handleClick = async () => {
    if (notification.type !== 'task-invitation') return

    const modal = await Modal(undefined, 'This will add you to the task')
    if (!modal.result) return modal.close()

    const data = await api.post(`/tasks/${notification.task}/invitation`)
    if (!data) return modal.close()

    $store(User.removeNoti(notification._id))
    modal.close()
  }

  const dateDiff = useMemo(() => {
    const sDiff = Math.floor(
      (Date.now() - new Date(notification.createdAt)) / 1000
    )

    if (sDiff <= 0) return 'now'
    if (sDiff < 60) return `${sDiff}s`
    if (sDiff < 60 * 60) return `${Math.floor(sDiff / 60)}m`
    if (sDiff < 60 * 60 * 24) return `${Math.floor(sDiff / (60 * 60))}h`
    return `${Math.floor(sDiff / (60 * 60 * 24))}d`
  }, [notification.createdAt])

  return (
    <div className={css.Item} onClick={handleClick}>
      <div className={css.image}>
        <img
          src={notification.createdBy.avatar}
          alt={notification.createdBy.username}
        />
      </div>

      <div className={css.desc}>
        <p>{notification.type}</p>
        <p className={css.date}>{dateDiff} ago</p>
      </div>

      <div className={css.menu}>
        <button>
          <HiOutlineDotsVertical />
        </button>
      </div>
    </div>
  )
}

export default ListItem
