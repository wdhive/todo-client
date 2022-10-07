import React from "react";
import homeIcon from "../assests/homeMenu.svg";
import searchIcon from "../assests/search.svg";
import bellIcon from "../assests/bell.svg";
import plusIcon from "../assests/plus.svg";
import profileIcon from "../assests/profile.svg";
import css from "./FooterNav.module.scss";

export default function FooterNav() {
  return (
    <div className={css.footerNav}>
      <div className={css.navItem}>
        <img src={homeIcon} alt="" />
        <span>Home</span>
      </div>
      <div className={css.navItem}>
        <img src={searchIcon} alt="" />
        <span>Search</span>
      </div>

      <div className={css.navItem}></div>

      <div className={`${css.notification} ${css.navItem}`}>
        <div className={css.badge}>4</div>
        <img src={bellIcon} alt="" />
        <span>Notification</span>
      </div>
      <div className={css.navItem}>
        <img src={profileIcon} alt="" />
        <span>Profile</span>
      </div>
      <div className={css.plus}>
        <img src={plusIcon} alt="" />
      </div>
    </div>
  );
}
