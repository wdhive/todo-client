import react, { Suspense, memo, useMemo } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import css from './Layout.module.scss'
import User from '$slice/User'
import settingsSlice from '$slice/Settings'
import useApiOnce from '$api/useApiOnce'

import Nav from '$components/Nav'
import Loading from '$components/Loading'
import NotFound from '$components/Error404'
import useMobileLayout from '$hooks/useMobileLayout'

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
  const api = useApiOnce('get', '/user?settings')
  api.onLoad((data) => {
    $store(User.updateUser(data.user))
    $store(settingsSlice.updateSettigns(data.settings))
  })

  useApiOnce('get', '/notifications').onLoad(({ notifications }) => {
    $store(User.initNoti(notifications))
  })

  useApiOnce('get', '/user/new-token').onLoad(({ token }) => {
    $store(User.jwt(token))
  })

  return api.loaded ? <LayoutContent /> : <Loading />
}

export default memo(MainLayout)
