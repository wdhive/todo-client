import css from './index.module.scss'
import MainNav from './MainNav'
import NavProfile from './NavProfile'
import NavFooter from './NavFooter'
import { useState } from 'react'

const index = () => {
  const [navExpand, setNavExpand] = useState(false)

  return (
    <nav className={css.Nav} main-nav-collapse={navExpand ? undefined : 'true'}>
      <NavProfile navExpand={navExpand} />
      <MainNav navExpand={navExpand} />
      <NavFooter navExpand={navExpand} setNavExpand={setNavExpand} />
    </nav>
  )
}

export default index
