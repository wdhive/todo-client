import react, { Suspense, memo } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import useMediaQuery from 'use-css-query'
import css from './Layout.module.scss'
import userSlice from '$slice/user'
import settingsSlice from '$slice/settings'
import useApiOnce from '$src/api/useApiOnce'

import Nav from '$components/Nav'
import Loading from '$components/Loading'
import NotFound from '$pages/404'

const TaskLayout = react.lazy(() => import('$pages/Task/Layout'))
const ProfileLayout = react.lazy(() => import('$pages/Profile/Layout'))
const Search = react.lazy(() => import('$pages/Main/Search'))
const Notifications = react.lazy(() => import('$pages/Main/Notifications'))

const MainLayout = () => {
  const api = useApiOnce('get', '/user?settings')

  useApiOnce('get', '/user/new-token').onLoad(({ token }) => {
    $store(userSlice.jwt(token))
  })

  api.onLoad((data) => {
    $store(userSlice.updateUser(data.user))
    $store(settingsSlice.updateSettigns(data.settings))
  })

  const mobileMode = useMediaQuery('(max-width: 62em)')

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

  if (!api.loaded) return <Loading />
  return (
    <div className={css.Layout}>
      {mobileMode || <Nav />}
      <div className={css.root}>{mainLayout}</div>
      {mobileMode && <Nav />}
    </div>
  )
}

export default memo(MainLayout)
