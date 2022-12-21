import { Link } from 'react-router-dom'
import { FaGithub } from 'react-icons/fa'

import css from './SigninSignup.module.scss'
import Brand from '$components/Brand'

const SigninSignup = ({ children }) => {
  const links = (
    <div className={css.hero__links}>
      <Link to="/">Home</Link>
      <Link to="/about">About us</Link>
      <Link to="/help">Help & Support</Link>
    </div>
  )

  return (
    <main className={css.main}>
      <div className="wrapper">
        <div className={css.hero}>
          <div className={css.hero__top}>
            <div className={css.hero__logo}>
              <Brand />
            </div>

            <h2 className={css.hero__title}>
              Let us be a tiny little part of your life
            </h2>
          </div>

          {links}
        </div>

        <div className={css.form}>
          {children}

          {links}
        </div>
      </div>
    </main>
  )
}

export default SigninSignup
