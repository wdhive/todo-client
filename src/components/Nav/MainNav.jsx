import { NavLink, useNavigate } from 'react-router-dom'
import useMediaQuery from '$hooks/useMediaQuery'
import css from './MainNav.module.scss'
import PlusIcon from '$assets/icons/add.svg?component'
import HomeIcon from '$assets/icons/home.svg?component'
import SearchIcon from '$assets/icons/search.svg?component'
import NotiIcon from '$assets/icons/bell.svg?component'
import ProfileIcon from '$assets/icons/account.svg?component'
import LogoutIcon from '$assets/icons/logout.svg?component'
import userSlice from '$slice/user'

const MainNav = () => {
  const navigate = useNavigate()
  const mobileMode = useMediaQuery('(max-width: 62em)')

  const addBtn = (
    <button
      onClick={() => navigate('/tasks/new')}
      className={cn('button', 'button__primary', css.addBtn)}
    >
      <span>Add Task</span> <PlusIcon />
    </button>
  )

  const handleLogout = () => {
    $store(userSlice.logout())
  }

  return (
    <div className={css.MainNav}>
      {mobileMode || addBtn}

      <NavLink to="/tasks" className={cn('button', css.homeBtn)}>
        <HomeIcon />
        <span>Home</span>
      </NavLink>

      <NavLink to="/search" className="button">
        <SearchIcon />
        <span>Search</span>
      </NavLink>

      {mobileMode && addBtn}

      <NavLink to="/notifications" className="button">
        <NotiIcon />
        <span>{mobileMode ? 'Notify' : 'Notifications'}</span>
      </NavLink>

      <NavLink to="/profile" className={cn('button', css.profileBtn)}>
        <ProfileIcon />
        <span>Profile</span>
      </NavLink>

      {mobileMode || (
        <button className={cn('button', css.logoutBtn)} onClick={handleLogout}>
          <LogoutIcon />
          <span>Logout</span>
        </button>
      )}
    </div>
  )
}

export default MainNav
