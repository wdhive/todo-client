import React from "react";
import css from "../components/SignupForm.module.scss";
import Input from "../components/Input";
import arrow from "../assests/left-arrow.svg";
import Button from "../components/Button";

export default function EmailVerify() {
  return (
    <>
      <div className={css.signupForm}>
        <div className={css.heading}>
          <img src={arrow} alt="" />
          <h2>Go Back</h2>
        </div>
        <form className={css.form}>
          <Input type="text" label="Email" placeholder="john.doe@example.com" />
          <label>Code</label>
          <div className={css.code}>
            <Input type="text" />
            <Input type="text" />
            <Input type="text" />
            <Input type="text" />
          </div>
          <Button className="fullWidthBtn btn2">Send OTP</Button>
          <div className={css.msg}>
            <p>
              Send again in <span>{58}</span> seconds
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
