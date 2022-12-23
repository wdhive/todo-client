import { useApiOnce, useSuspenseApiOnce, createAnchor } from '$api/react'
import Settings from '$slice/Settings'
import User from '$slice/User'
import Tasks from '$slice/Tasks'
import pwaManager from '$utils/pwa'

pwaManager()
const apiAnchor = createAnchor()

export default () => {
  useSuspenseApiOnce(
    apiAnchor,
    ['get', '/user?settings'],
    ['get', '/tasks'],
    ['get', '/notifications'],
    ([{ data: userData }, { data: taskData }, { data: notiData }]) => {
      userData && $store(User.updateUser(userData.user))
      userData && $store(Settings.updateSettigns(userData.settings))
      taskData && $store(Tasks.initTasks(taskData.tasks))
      notiData && $store(User.initNoti(notiData.notifications))
    }
  )

  useApiOnce('get', '/account/new-token', ({ token }) => {
    $store(User.jwt(token))
  })
}
