import React from "react";
import css from "./SignupForm.module.scss";
import Input from "./Input";
// import eyeOpen from "../assests/eye-open.svg";
import eyeClose from "../assests/eye-close.svg";
import arrow from "../assests/left-arrow.svg";
import Button from "./Button";

export default function ChangePasswordForm() {
  return (
    <>
      <div className={css.signupForm}>
        <div className={css.heading}>
          <img src={arrow} alt="" />
          <h2>Go Back</h2>
        </div>
        <form className={css.form}>
          <Input
            type="password"
            label="New Password"
            placeholder="******"
            icon={eyeClose}
          />
          <Input
            type="password"
            label="Confirm New Password"
            placeholder="******"
            icon={eyeClose}
          />
          <Button className="fullWidthBtn btn2">Log In</Button>
        </form>
      </div>
    </>
  );
}
