import react, { Suspense } from 'react'
import { useSelector } from 'react-redux'
import { Routes, Route, Navigate } from 'react-router-dom'
import css from './Layout.module.scss'
import Nav from '@com/Nav'
import Loading from '@com/Loading'
import NotFound from '@pages/NotFound'

const TaskLayout = react.lazy(() => import('@pages/Task/Layout'))
const ProfileLayout = react.lazy(() => import('@pages/Profile/Layout'))
const Search = react.lazy(() => import('@pages/Main/Search'))
const Notifications = react.lazy(() => import('@pages/Main/Notifications'))

const MainLayout = () => {
  const user = useSelector((state) => state.user)
  console.log(user)

  return (
    <div className={css.Layout}>
      <Nav />

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
    </div>
  )
}

export default MainLayout
