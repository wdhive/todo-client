import { useApiOnce, createSuspenseApi } from '$api/react'
import Settings from '$slice/Settings'
import User from '$slice/User'
import Tasks from '$slice/Tasks'
import pwaManager from '$utils/pwa'

pwaManager()
const useSuspenseApi = createSuspenseApi()

export default () => {
  const response = useSuspenseApi(
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

  useApiOnce('get', '/account/new-token', (data) => {
    data?.token && $store(User.jwt(data.token))
  })

  return response
}
