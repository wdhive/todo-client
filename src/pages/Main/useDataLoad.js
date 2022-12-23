import { useApiOnce, useSuspenseApiOnce } from '$api/react'
import { createAnchor } from 'use-react-api'
import settingsSlice from '$slice/Settings'
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
    ([
      {
        data: { user, settings },
      },
      {
        data: { tasks },
      },
      {
        data: { notifications },
      },
    ]) => {
      user && $store(User.updateUser(user))
      settings && $store(settingsSlice.updateSettigns(settings))
      tasks && $store(Tasks.initTasks(tasks))
      notifications && $store(User.initNoti(notifications))
    }
  )

  useApiOnce('get', '/account/new-token', ({ token }) => {
    $store(User.jwt(token))
  })
}
