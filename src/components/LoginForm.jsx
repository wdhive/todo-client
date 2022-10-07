import React from "react";
import css from "./SignupForm.module.scss";
import Input from "./Input";
// import eyeOpen from "../assests/eye-open.svg";
import eyeClose from "../assests/eye-close.svg";
import Button from "./Button";
import { Link } from "react-router-dom";

export default function LoginForm() {
  return (
    <>
      <div className={css.signupForm}>
        <h2>Login</h2>
        <form className={css.form}>
          <Input
            type="text"
            label="Email or Username"
            placeholder="john.doe@example.com"
          />
          <Input
            type="password"
            label="Password"
            placeholder="******"
            icon={eyeClose}
          />
          <div className={css.forgotPwd}>
            <Link to="/email-verify">Forgot Password?</Link>
          </div>
          <Button className="fullWidthBtn btn2">Log In</Button>
        </form>
        <div className={css.msg}>
          <p>
            Already signed up? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
    </>
  );
}
