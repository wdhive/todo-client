import avatar from '$assets/avatar.png'
import getNotificationMsg from '$components/Notifications/utils'

export default (notification) => {
  if (!window.Notification) return
  const n = new Notification("You've got an update...", {
    body: getNotificationMsg(notification.type, notification.createdBy.name),
    badge: '/logo/png/moderate-1_256x256.png',
    icon: notification.createdBy.avatar ?? avatar,
    icon: avatar,
  })

  n.onclick = () => window.focus()
  setTimeout(() => n.close(), 5000)
}
