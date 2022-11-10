import css from './MainNav.module.scss'
import PlusIcon from '@ass/icons/add.svg?component'

const MainNav = () => {
  return (
    <div className={css.MainNav}>
      <button className={css.active}>Home</button>

      <button>Search</button>

      <button className={css.addBtn}>
        
        
        <PlusIcon />
      </button>

      <button>Notifications</button>

      <button>Profile</button>
    </div>
  )
}

export default MainNav
