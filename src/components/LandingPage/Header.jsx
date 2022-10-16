import { useRef } from 'react'
import { NavLink } from 'react-router-dom'
import css from './Header.module.scss'
import Logo from '@ass/logo/moderate-1.svg?component'
import HomeIcon from '@ass/icons/home.svg?component'
import AboutIcon from '@ass/icons/about-us.svg?component'
import HelpSupportIcon from '@ass/icons/help-&-support.svg?component'
import LoginBtn from './LoginBtn'
import SignupBtn from './SignupBtn'

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
    <header>
      <div className="--">
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
              <LinkItem to="/">
                <HomeIcon />
                <span>Home</span>
              </LinkItem>
              <LinkItem to="/about-us">
                <AboutIcon />
                <span>About</span>
              </LinkItem>
              <LinkItem to="/help-support">
                <HelpSupportIcon />
                <span>Help & Support</span>
              </LinkItem>
            </div>

            <div className={`${css.linkList} ${css.linkList__cta}`}>
              <LoginBtn label="Login" />
              <SignupBtn label="Start for free" />
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Nav
