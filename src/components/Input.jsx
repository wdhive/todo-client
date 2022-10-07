import React from "react";
import css from "./Input.module.scss";

export default function Input({ label, icon, ...rest }) {
  return (
    <div className={css.textInput}>
      <label>{label}</label>
      <div className={css.inputField}>
        <input {...rest} />
        {icon && <img src={icon} alt="" />}
      </div>
    </div>
  );
}
