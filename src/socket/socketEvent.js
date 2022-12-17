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
    console.log(task)
    $store(Tasks.updateOrAddTask(task))
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

  ['task-invitation-denied']({ notification }) {
    $store(User.addNoti(notification))
  },

  ['task-particiapnt-left']({ notification }) {
    $store(User.addNoti(notification))
  },

  ['task-particiapnt-removed']({ notification }) {
    $store(User.addNoti(notification))
    $store(Tasks.deleteTask(notification.task))
  },

  ['notification-delete']({ notification }) {
    $store(User.removeNoti(notification))
  },
}
