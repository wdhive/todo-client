import css from './Hero.module.scss'
import bgImage from '@ass/bg-left.png'

const Hero = () => {
  return (
    <div className={css.hero}>
      <div className="--">
        <div className={css.hero__content}>
          <h2 className={css.hero__title}>
            Smash all of your ideas into one place
          </h2>

          <p className={css.hero__description}>
            <strong>Collaborate</strong> with your <strong>friends</strong> to
            help you make your journey of bringing them to live a bit more
            <strong> fun</strong>.
          </p>

          <div className={css.hero__buttons}>
            <button>Signup</button>
            <button>Continue anyways</button>
          </div>

          <p className={css.hero__status}>
            <strong>99</strong> people are already enjoying our app
          </p>
        </div>

        <div className={css.hero__fancy}></div>
      </div>
    </div>
  )
}

export default Hero
