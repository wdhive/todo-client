import css from './SigninSignup.module.scss'
import Logo from '@ass/logo/moderate-1.svg?component'

const SigninSignup = ({ children }) => {
  return (
    <main className={css.main}>
      <div className="wrapper">
        <div className={css.hero}>
          <div className={css.hero__top}>
            <div className={css.hero__logo}>
              <Logo />
              <h1>todo</h1>
            </div>

            <h2 className={css.hero__title}>
              Let us be a tiny little part of your life
            </h2>
          </div>

          <div className={css.hero__links}>Link</div>
        </div>

        <div className={css.form}>{children}</div>
      </div>
    </main>
  )
}

export default SigninSignup
