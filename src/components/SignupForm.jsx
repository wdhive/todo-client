import React from "react";
import css from "./SignupForm.module.scss";
import camera from "../assests/camera.svg";
import Input from "./Input";
import eyeOpen from "../assests/eye-open.svg";
import eyeClose from "../assests/eye-close.svg";
import Button from "./Button";
import { Link } from "react-router-dom";

export default function SignupForm() {
  return (
    <>
      <div className={css.signupForm}>
        <h2>Sign Up</h2>
        <div className={css.camera}>
          <img src={camera} alt="" />
        </div>
        <form className={css.form}>
          <div className={css.inputGroup}>
            <Input type="text" label="First Name" placeholder="John" />
            <Input type="text" label="Last Name" placeholder="Doe" />
          </div>
          <Input type="text" label="Username" placeholder="John_doe" />
          <Input
            type="password"
            label="Password"
            placeholder="******"
            icon={eyeOpen}
          />
          <Input
            type="password"
            label="Confirm Password"
            placeholder="******"
            icon={eyeClose}
          />
          <Button className="fullWidthBtn btn2">Sign Up</Button>
        </form>
        <div className={css.msg}>
          <p>
            Already signed up? <Link to="/Login">login</Link>
          </p>
        </div>
      </div>
    </>
  );
}
