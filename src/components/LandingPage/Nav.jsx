import { NavLink } from 'react-router-dom';
import css from './Nav.module.scss';
import Logo from '@ass/logo/moderate-1.svg?component';

const LinkItem = ({ to, children }) => {
  const getClassName = navData => (navData.isActive ? css.active : '');

  return (
    <li>
      <NavLink to={to} className={getClassName}>
        {children}
      </NavLink>
    </li>
  );
};

const Nav = () => {
  return (
    <nav>
      <div className={css.logo}>
        <Logo />
        todo
      </div>

      <div className={css.listContainer}>
        <ul className={css.linkList}>
          <LinkItem to="/">Home</LinkItem>
        </ul>

        <ul className={css.ctaLinkList}></ul>
      </div>
    </nav>
  );
};

export default Nav;
