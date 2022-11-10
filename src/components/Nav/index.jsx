import css from './index.module.scss'
import MainNav from './MainNav'
import NavProfile from './NavProfile'

const index = () => {
  return (
    <div className={css.Nav}>
      <NavProfile />
      <MainNav />
    </div>
  )
}

export default index
