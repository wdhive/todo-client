import css from './LandingPage.module.scss';
import Nav from '@com/LandingPage/Nav';
import Hero from '@com/LandingPage/Hero';

const LandingPage = () => {
  return (
    <div className={css.landingContainer}>
      <Nav />
      <Hero />
    </div>
  );
};

export default LandingPage;
