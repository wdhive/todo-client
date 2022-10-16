import css from './LandingPage.module.scss'
import Header from '@com/LandingPage/Header'
import Hero from '@com/LandingPage/Hero'

const LandingPage = () => {
  return (
    <div className={css.landingPage}>
      <Header />
      <Hero />
    </div>
  )
}

export default LandingPage
