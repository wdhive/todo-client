import react, { memo, Suspense, useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import useMobileLayout from '$hooks/useMobileLayout'
import useDataLoad from './useDataLoad'

import css from './Layout.module.scss'
import NotFound from '$components/Error404'
import Loading from '$components/Loading'
import Nav from '$components/Nav'
import TaskLayout from '$pages/Task/Layout'

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
  const response = useDataLoad()

  useEffect(() => {
    response.forEach(({ ok }) => {
      if (ok) return
      throw new Error([...new Set(response.map(({ error }) => error))])
    })
  }, [response])

  return <LayoutContent />
}

export default memo(MainLayout)
