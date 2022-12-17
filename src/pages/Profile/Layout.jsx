import { Routes, Route, Navigate, Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { HiOutlineArrowLeft } from 'react-icons/hi'
import useMobileLayout from '$hooks/useMobileLayout'

import css from './Layout.module.scss'
import Account from './Account'
import Preferences from './Preferences'
import NavProfile from '$components/Nav/NavProfile'
import NavList from '$components/Profile/NavList'

const ContentLayout = ({ children, mobileMode, title }) => {
  const ref = useRef()

  useEffect(() => {
    if (!ref.current) return
    ref.current.close()
    mobileMode && ref.current.showModal()
  }, [mobileMode])

  const content = (
    <div className={css.content}>
      <div className="wrapper">{children}</div>
    </div>
  )

  if (!mobileMode) return content

  return (
    <dialog ref={ref} className={css.dialog}>
      <div className={css.header}>
        <div className="wrapper">
          <h5>{title}</h5>
          <Link to="..">
            <HiOutlineArrowLeft />
          </Link>
        </div>
      </div>

      {content}
    </dialog>
  )
}

const ProfileLayout = () => {
  const mobileMode = useMobileLayout()

  return (
    <div className={css.Profile}>
      {mobileMode && (
        <NavProfile hideTheme column={false} className={css.navProfile} />
      )}

      <NavList mobileMode={mobileMode} />

      <Routes>
        <Route index element={mobileMode ? <></> : <Navigate to="account" />} />

        <Route
          path="account"
          element={
            <ContentLayout mobileMode={mobileMode} title={'Account Settings'}>
              <Account />
            </ContentLayout>
          }
        />

        <Route
          path="preferences"
          element={
            <ContentLayout mobileMode={mobileMode} title={'Preferences'}>
              <Preferences />
            </ContentLayout>
          }
        />
        <Route path="*" element={<Navigate to="/profile" />} />
      </Routes>
    </div>
  )
}

export default ProfileLayout
