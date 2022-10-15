import { NavLink } from 'react-router-dom'
import css from './Nav.module.scss'
import Logo from '@ass/logo/moderate-1.svg?component'
import { useRef } from 'react'

const LinkItem = ({ to, children }) => {
  const getClassName = navData =>
    `${css.navLink} ${navData.isActive ? css.active || '' : ''}`

  return (
    <NavLink to={to} className={getClassName}>
      {children}
    </NavLink>
  )
}

const Nav = () => {
  const navRef = useRef()
  const handleToggleNav = () => {
    navRef.current.classList.toggle(css.navActive)
  }

  const handleCloseNav = () => {
    navRef.current.classList.remove(css.navActive)
  }

  return (
    <nav ref={navRef} className={css.nav}>
      <div className={css.logo}>
        <Logo />
        <h1>todo</h1>
      </div>

      <button className={css.linkToggle} onClick={handleToggleNav}>
        Toggle
      </button>

      <div className={css.listBackdrop} onClick={handleCloseNav} />

      <div className={css.listContainer}>
        <div className={`${css.linkList} ${css.linkList__primary}`}>
          <LinkItem to="/">Home</LinkItem>{' '}
          <LinkItem to="/about-us">About</LinkItem>
          <LinkItem to="/help-support">Help & Support</LinkItem>
        </div>

        <div className={`${css.linkList} ${css.linkList__cta}`}>
          <button className={`${css.navButton} ${css.navButton__primary}`}>
            Login
          </button>
          <button className={`${css.navButton} ${css.navButton__secondary}`}>
            Start For Free
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Nav
