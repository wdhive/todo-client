import { useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import useMediaQuery from '@hooks/useMediaQuery'
import css from './Header.module.scss'
import HomeIcon from '@ass/icons/home.svg?component'
import HamburgerIcon from '@ass/icons/hamburger.svg?component'
import CrossIcon from '@ass/icons/cross.svg?component'
import AboutIcon from '@ass/icons/about-us.svg?component'
import HelpSupportIcon from '@ass/icons/help-&-support.svg?component'
import Brand from '@com/Brand'
import LoginBtn from './LoginBtn'
import SignupBtn from './SignupBtn'

const LinkItem = ({ to, children }) => {
  const getClassName = (navData) =>
    `button ${css.navLink} ${navData.isActive ? css.active || '' : ''}`

  return (
    <NavLink to={to} className={getClassName}>
      {children}
    </NavLink>
  )
}

const Nav = () => {
  const dialougeRef = useRef()
  const mobileMode = useMediaQuery('(max-width: 62em)')
  const handleCloseDialog = () => dialougeRef.current.close()
  const handleShowDialog = () => dialougeRef.current.showModal()

  useEffect(() => {
    if (!mobileMode) {
      handleCloseDialog()
    }
  }, [mobileMode])

  return (
    <header>
      <div className="wrapper">
        <nav className={css.nav}>
          <Brand />

          <button className={css.showDialog} onClick={handleShowDialog}>
            <HamburgerIcon />
          </button>

          <dialog className={css.dialog} ref={dialougeRef}>
            <div className={css.listBackdrop} onClick={handleCloseDialog} />

            <div className={css.listContainer}>
              <button className={css.closeDialog} onClick={handleCloseDialog}>
                <CrossIcon />
              </button>

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
                {mobileMode ? (
                  <>
                    <SignupBtn label="Start for free" />
                    <LoginBtn label="Login" />
                  </>
                ) : (
                  <>
                    <LoginBtn label="Login" />
                    <SignupBtn label="Start for free" />
                  </>
                )}
              </div>
            </div>
          </dialog>
        </nav>
      </div>
    </header>
  )
}

export default Nav
