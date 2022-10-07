import React from "react";
import css from "./Button.module.scss";

export default function Button({ children, className, ...rest }) {
  return (
    <button className={`${css.btn} ${className}`} {...rest}>
      {children}
    </button>
  );
}
