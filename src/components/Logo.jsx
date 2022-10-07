import React from "react";
import css from "./Logo.module.scss";
import logo from "../assests/logo.png";
import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <div className={css.logo}>
      <Link to="/">
        <img src={logo} alt="logo" />
        <span> todo</span>
      </Link>
    </div>
  );
}
