import css from './MainNav.module.scss'
import PlusIcon from '@ass/icons/add.svg?component'
import HomeIcon from '@ass/icons/home.svg?component'
import SearchIcon from '@ass/icons/search.svg?component'
import NotiIcon from '@ass/icons/bell.svg?component'
import ProfileIcon from '@ass/icons/account.svg?component'
import LogoutIcon from '@ass/icons/logout.svg?component'

const MainNav = () => {
  return (
    <div className={css.MainNav}>
      <button className={cn('button', css.homeBtn, css.active)}>
        <HomeIcon />
        <span>Home</span>
      </button>

      <button className="button">
        <SearchIcon />
        <span>Search</span>
      </button>

      <button className={cn('button', 'button__primary', css.addBtn)}>
        <span>Add Task</span> <PlusIcon />
      </button>

      <button className="button">
        <NotiIcon />
        <span className={css.labelNotify}>Notify</span>
        <span className={css.labelNotification}>Notifications</span>
      </button>

      <button className={cn('button', css.profileBtn)}>
        <ProfileIcon />
        <span>Profile</span>
      </button>

      <button className={cn('button', css.logoutBtn)}>
        <LogoutIcon />
        <span>Logout</span>
      </button>
    </div>
  )
}

export default MainNav
