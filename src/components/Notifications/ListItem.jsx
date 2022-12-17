import { useMemo, useState } from 'react'
import { HiOutlineTrash } from 'react-icons/hi'
import User from '$slice/User'
import useApi from '$api/useApi'
import useInterval from '$hooks/useInterval'
import Tasks from '$slice/Tasks'
import { notificationMessages } from './utils'

import css from './ListItem.module.scss'
import Modal from '$ui/Uncontrolled/Modal'

const ListItem = ({ notification }) => {
  const api = useApi()
  const [state, setState] = useState()

  const handleClick = async () => {
    if (notification.type !== 'task-invitation') return

    const modal = await Modal({ description: 'This will add you to the task' })
    if (!modal.result) return modal.close()

    const data = await api.post(`/tasks/${notification.task}/invitation`)
    if (!data) return modal.close()

    $store(Tasks.addTask(data.task))
    $store(User.removeNoti(notification._id))
    modal.close()
  }

  const handleDeleteClick = async (e) => {
    e.stopPropagation()
    const url = `/notifications/${notification._id}`
    const data = await api.delete(url)
    if (!data) return
    $store(User.removeNoti(notification._id))
  }

  const dateDiff = useMemo(() => {
    const sDiff = Math.floor(
      (Date.now() - new Date(notification.createdAt)) / 1000
    )

    if (sDiff <= 0) return 'now'
    if (sDiff < 60) return `${sDiff}s ago`
    if (sDiff < 60 * 60) return `${Math.floor(sDiff / 60)}m ago`
    if (sDiff < 60 * 60 * 24) return `${Math.floor(sDiff / (60 * 60))}h ago`
    return `${Math.floor(sDiff / (60 * 60 * 24))}d ago`
  }, [notification.createdAt, state])

  useInterval(() => {
    setState({})
  }, 3000)

  const notiTitle = useMemo(() => {
    const msg = notificationMessages[notification.type]
    if (!msg) return 'No info...'
    const newMsg = []
    const msgParts = msg.split('{user}')
    const notLastPart = msgParts.slice(0, -1)
    const lastPart = msgParts.slice(-1)

    notLastPart.forEach((p, ind) => {
      newMsg.push(p, <strong key={ind}>{notification.createdBy.name}</strong>)
    })
    newMsg.push(lastPart)

    return newMsg
  }, [notification.title, notification.createdBy.name])

  return (
    <div className={css.Item} onClick={handleClick}>
      <div className={css.image}>
        <img
          src={notification.createdBy.avatar}
          alt={notification.createdBy.username}
        />
      </div>

      <div className={css.desc}>
        <p>{notiTitle}</p>
        <p className={css.date}>{dateDiff}</p>
      </div>

      <div className={css.menu}>
        <button onClick={handleDeleteClick} disabled={api.loading}>
          <HiOutlineTrash />
        </button>
      </div>
    </div>
  )
}

export default ListItem
