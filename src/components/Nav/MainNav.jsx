import { NavLink, useNavigate } from 'react-router-dom'
import css from './MainNav.module.scss'
import userSlice from '$slice/User'
import {
  IoHomeOutline,
  IoSearchOutline,
  IoNotificationsOutline,
  IoExitOutline,
} from 'react-icons/io5'
import { HiOutlineUser } from 'react-icons/hi2'
import { TfiPlus } from 'react-icons/tfi'
import useMobileLayout from '$hooks/useMobileLayout'

const MainNav = () => {
  const navigate = useNavigate()
  const mobileMode = useMobileLayout()

  const addBtn = (
    <button
      onClick={() => navigate('/tasks/new')}
      className={cn('button', 'button__primary', css.addBtn)}
    >
      <span>Add Task</span> <TfiPlus />
    </button>
  )

  const handleLogout = () => {
    $store(userSlice.jwt())
  }

  return (
    <div className={css.MainNav}>
      {mobileMode || addBtn}

      <NavLink to="/tasks" className={cn('button', css.homeBtn)}>
        <IoHomeOutline />
        <span>Home</span>
      </NavLink>

      <NavLink to="/search" className="button">
        <IoSearchOutline />
        <span>Search</span>
      </NavLink>

      {mobileMode && addBtn}

      <NavLink to="/notifications" className="button">
        <IoNotificationsOutline />
        <span>{mobileMode ? 'Notify' : 'Notifications'}</span>
      </NavLink>

      <NavLink to="/profile" className={cn('button', css.profileBtn)}>
        <HiOutlineUser />
        <span>Profile</span>
      </NavLink>

      {mobileMode || (
        <button className={cn('button', css.logoutBtn)} onClick={handleLogout}>
          <IoExitOutline />
          <span>Logout</span>
        </button>
      )}
    </div>
  )
}

export default MainNav
