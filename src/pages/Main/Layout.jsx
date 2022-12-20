import react, { memo, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import useApiOnce from '$api/useApiOnce'
import settingsSlice from '$slice/Settings'
import User from '$slice/User'

import css from './Layout.module.scss'
import NotFound from '$components/Error404'
import Loading from '$components/Loading'
import Nav from '$components/Nav'
import useMobileLayout from '$hooks/useMobileLayout'
import Tasks from '$slice/Tasks'

const TaskLayout = react.lazy(() => import('$pages/Task/Layout'))
const ProfileLayout = react.lazy(() => import('$pages/Profile/Layout'))
const Search = react.lazy(() => import('$pages/Main/Search'))
const Notifications = react.lazy(() => import('$pages/Main/Notifications'))

const LayoutContent = memo(() => {
  const mobileMode = useMobileLayout()

  const mainLayout = (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route index element={<Navigate replace to="/tasks" />} />
        <Route path="tasks/*" element={<TaskLayout />} />

        <Route path="profile/*" element={<ProfileLayout />} />
        <Route path="search" element={<Search />} />
        <Route path="notifications" element={<Notifications />} />

        <Route path="login/*" element={<Navigate replace to="/" />} />
        <Route path="signin/*" element={<Navigate replace to="/" />} />
        <Route path="signup/*" element={<Navigate replace to="/" />} />
        <Route path="register/*" element={<Navigate replace to="/" />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  )

  return (
    <div className={css.Layout}>
      {mobileMode || <Nav />}
      <div className={css.root}>{mainLayout}</div>
      {mobileMode && <Nav />}
    </div>
  )
})

const MainLayout = () => {
  const api = useApiOnce('get', '/user?settings', (data) => {
    $store(User.updateUser(data.user))
    $store(settingsSlice.updateSettigns(data.settings))
    console.log(data.settings)
  })

  useApiOnce('get', '/notifications', ({ notifications }) => {
    $store(User.initNoti(notifications))
  })

  useApiOnce('get', '/account/new-token', ({ token }) => {
    $store(User.jwt(token))
  })

  const api2 = useApiOnce('get', '/tasks', (data) => {
    $store(Tasks.initTasks(data.tasks))
  })

  return api.loading || api2.loading ? <Loading /> : <LayoutContent />
}

export default memo(MainLayout)
