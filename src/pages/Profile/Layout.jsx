import { Routes, Route, Navigate } from 'react-router-dom'
import Profile from '.'
import Theme from './Theme'
import Account from './Account'
import TaskCategories from './TaskCategories'

const ProfileLayout = () => {
  return (
    <>
      <Profile />
      <Routes>
        <Route index element={<></>} />
        <Route path="theme" element={<Theme />} />
        <Route path="account" element={<Account />} />
        <Route path="categories" element={<TaskCategories />} />
        <Route path="*" element={<Navigate to="/profile" />} />
      </Routes>
    </>
  )
}

export default ProfileLayout
