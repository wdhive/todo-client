import React from "react";
import css from "./ProfileMenu.module.scss";
export default function ProfileMenu({ icon, label, arrow, className }) {
  return (
    <div className={`${className} ${css.profileMenu}`}>
      <img src={icon} alt="" />
      <label>{label}</label>
      {arrow && <img src={arrow} alt="" />}
    </div>
  );
}
