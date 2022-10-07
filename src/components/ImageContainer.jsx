import React from "react";
import Logo from "./Logo";
import css from "./ImageContainer.module.scss";
import { Link } from "react-router-dom";
import githubImg from "../assests/github.svg";

export default function ImageContainer() {
  return (
    <>
      <div className={css.imgContainer}>
        <Logo />
        <div className={css.imgContainerContent}>
          <div className={css.title}>
            <h1>Let us me a tiny little part of your life</h1>
          </div>
          <div className={css.footerMenu}>
            <Link className={css.navLink} to="/">
              Home
            </Link>
            <Link className={css.navLink} to="/about-us">
              About Us
            </Link>
            <Link className={css.navLink} to="/help-and-support">
              Help &amp; Support
            </Link>
            <Link className={css.navLink} to="">
              <img src={githubImg} alt="" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
