import Tasks from '$slice/Tasks'
import User from '$slice/User'

export default {
  connect(socket) {
    console.log(socket.id)
  },

  disconnect() {
    console.log('Socket disconnect')
  },

  ['task-update']({ task }) {
    $store(Tasks.updateTask(task))
  },

  ['task-delete']({ task }) {
    $store(Tasks.deleteTask(task))
  },

  ['task-invitation']({ notification }) {
    $store(User.addNoti(notification))
  },

  ['task-invitation-accepted']({ notification }) {
    $store(User.addNoti(notification))
  },

  ['notification-delete']({ notification }) {
    $store(User.removeNoti(notification))
  },

  ['task-particiapnt-removed']({ notification }) {
    $store(Tasks.addNoti(notification))
    $store(Tasks.deleteTask(notification.task))
  },
}
