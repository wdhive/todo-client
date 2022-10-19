import css from './Hero.module.scss'
import SignupBtn from './SignupBtn'
import ProximityEffect from './ProximityEffect'

const Hero = () => {
  return (
    <div className={css.hero}>
      <div className="wrapper">
        <div className={css.hero__content}>
          <div className={css.hero__quote}>
            <h1 className={css.hero__title}>
              Smash all your ideas into one place
            </h1>
            <p className={css.hero__description}>
              <strong>Collaborate</strong> with your <strong>friends</strong> to
              help you make your journey of bringing them to live a bit more
              <strong> fun</strong>.
            </p>
          </div>

          <div className={css.hero__cta}>
            <div className={css.hero__buttons}>
              <SignupBtn label="Signup" />
              <button className="button button__secondary">
                Continue anyways
              </button>
            </div>
            <p className={css.hero__status}>
              <strong>99</strong> people are already enjoying our app
            </p>
          </div>
        </div>

        <div className={css.showOff}>
          <div className={css.showOff__eye}>
            <ProximityEffect />
          </div>
          <div className={css.showOff__desktop}></div>
          <div className={css.showOff__mobile}></div>
        </div>
      </div>
    </div>
  )
}

export default Hero
