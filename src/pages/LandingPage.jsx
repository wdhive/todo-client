import css from './LandingPage.module.scss'
import Header from '$components/LandingPage/Header'
import Hero from '$components/LandingPage/Hero'

const LandingPage = () => {
  return (
    <div className={css.landingPage}>
      <Header />
      <Hero />
    </div>
  )
}

export default LandingPage
