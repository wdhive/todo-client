import { useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import css from './Header.module.scss'
import Brand from '$components/Brand'
import LoginBtn from './LoginBtn'
import SignupBtn from './SignupBtn'

import { IoHomeOutline } from 'react-icons/io5'
import { SlPeople, SlMenu } from 'react-icons/sl'
import { FaRegQuestionCircle } from 'react-icons/fa'
import { TfiPlus } from 'react-icons/tfi'
import useMobileLayout from '$hooks/useMobileLayout'

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
  const mobileMode = useMobileLayout()
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
            <SlMenu />
          </button>

          <dialog className={css.dialog} ref={dialougeRef}>
            <div className={css.listBackdrop} onClick={handleCloseDialog} />

            <div className={css.listContainer}>
              <button className={css.closeDialog} onClick={handleCloseDialog}>
                <TfiPlus />
              </button>

              <div className={`${css.linkList} ${css.linkList__primary}`}>
                <LinkItem to="/">
                  <IoHomeOutline />
                  <span>Home</span>
                </LinkItem>
                <LinkItem to="/about">
                  <SlPeople />
                  <span>About</span>
                </LinkItem>
                <LinkItem to="/help">
                  <FaRegQuestionCircle />
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
