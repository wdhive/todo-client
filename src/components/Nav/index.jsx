import { useState } from 'react'
import useEffectExceptOnMount from 'use-effect-except-on-mount'
import { setLocalStroage } from '$src/Effect'
import css from './index.module.scss'
import MainNav from './MainNav'
import NavProfile from './NavProfile'
import NavFooter from './NavFooter'

const index = () => {
  const [navExpand, setNavExpand] = useState(
    () => localStorage.getItem('app-settings-nav-expand') === 'true'
  )
  useEffectExceptOnMount(() => {
    setLocalStroage('app-settings-nav-expand', navExpand)
  }, [navExpand])

  return (
    <nav className={css.Nav} main-nav-collapse={navExpand ? undefined : 'true'}>
      <NavProfile navExpand={navExpand} />
      <MainNav navExpand={navExpand} />
      <NavFooter navExpand={navExpand} setNavExpand={setNavExpand} />
    </nav>
  )
}

export default index
