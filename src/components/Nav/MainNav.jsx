import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import useMediaQuery from '@hooks/useMediaQuery'
import css from './MainNav.module.scss'
import PlusIcon from '@ass/icons/add.svg?component'
import HomeIcon from '@ass/icons/home.svg?component'
import SearchIcon from '@ass/icons/search.svg?component'
import NotiIcon from '@ass/icons/bell.svg?component'
import ProfileIcon from '@ass/icons/account.svg?component'
import LogoutIcon from '@ass/icons/logout.svg?component'

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
        <button className={cn('button', css.logoutBtn)}>
          <LogoutIcon />
          <span>Logout</span>
        </button>
      )}
    </div>
  )
}

export default MainNav
