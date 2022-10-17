import { Link } from 'react-router-dom'
import css from './SigninSignup.module.scss'
import Brand from '@com/Brand'
import GithubIcon from '@ass/icons/github.svg?component'

const SigninSignup = ({ children }) => {
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

          <div className={css.hero__links}>
            <Link to="/">Home</Link>
            <Link to="/about-us">About us</Link>
            <Link to="/help-support">Help & Support</Link>
            <a
              className={css.githubLink}
              target="_blank"
              href="https://github.com/BabyDevs/Todo-App"
            >
              <GithubIcon />
            </a>
          </div>
        </div>

        <div className={css.form}>{children}</div>
      </div>
    </main>
  )
}

export default SigninSignup
