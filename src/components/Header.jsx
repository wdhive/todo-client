import React, { useState } from "react";
import css from "./Header.module.scss";
import logo from "../assests/logo.png";
import homeIcon from "../assests/home.svg";
import aboutIcon from "../assests/about.svg";
import FAQIcon from "../assests/faq.svg";
import openIcon from "../assests/menu.svg";
import closeIcon from "../assests/close.svg";
import { Link } from "react-router-dom";
import Button from "./Button";
import Logo from "./Logo";

export default function Header() {
  const [mobileMenu, setMobileMenu] = useState(false);
  return (
    <header>
      <div className="container">
        <nav className={css.navbar}>
          <Logo />
          <div className={css.menuIcon}>
            <img
              onClick={() => setMobileMenu(!mobileMenu)}
              src={mobileMenu ? closeIcon : openIcon}
              alt="menuIcon"
            />
          </div>
          <ul
            className={
              mobileMenu ? `${css.navMenu} ${css.navMenuActive}` : css.navMenu
            }
          >
            <li>
              <Link className={css.navLink} to="/">
                <img src={homeIcon} alt="homeIcon" />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link className={css.navLink} to="/about-us">
                <img src={aboutIcon} alt="aboutIcon" />
                <span>About Us</span>
              </Link>
            </li>
            <li>
              <Link className={css.navLink} to="/help-and-support">
                <img src={FAQIcon} alt="FAQIcon" />
                <span>Help &amp; Support</span>
              </Link>
            </li>
            <li>
              <Link to="/login">
                <Button className={`${css.mobileViewBtn} btn1`}>Login</Button>
              </Link>
            </li>
            <li>
              <Link to="/signup">
                <Button className={`${css.mobileViewBtn} btn2`}>
                  Start For Free
                </Button>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
