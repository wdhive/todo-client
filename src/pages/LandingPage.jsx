import css from './LandingPage.module.scss'
import Nav from '@com/LandingPage/Nav'
import Hero from '@com/LandingPage/Hero'

const LandingPage = () => {
  return (
    <div className={css.landingPage}>
      <header>
        <div className="--">
          <Nav />
        </div>
      </header>

      <Hero />
    </div>
  )
}

export default LandingPage
