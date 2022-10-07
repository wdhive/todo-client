import React from "react";
import avatar from "../assests/avatar.png";
import deleteIcon from "../assests/delete.svg";
import css from "./Participant.module.scss";

export default function Participant() {
  return (
    <div className={css.participants}>
      <div className={css.user}>
        <img src={avatar} alt="" />
        <p className={css.label}>Jonas Schmedtman</p>
      </div>
      <div className={css.userOption}>
        <select name="userSelector">
          <option value="admin">Admin</option>
          <option value="moderator">Moderator</option>
          <option value="guest">Guest</option>
        </select>
      </div>
      <div className={css.editIcon}>
        <img src={deleteIcon} alt="" />
      </div>
    </div>
  );
}
