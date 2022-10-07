import React from "react";
import ImageContainer from "../components/ImageContainer";
import LoginForm from "../components/LoginForm";
import css from "./Signup.module.scss";

export default function Login() {
  return (
    <section id={css.form}>
      <div className="container">
        <div className="row">
          <div className="col-6">
            <ImageContainer />
          </div>
          <div className="col-6">
            <LoginForm />
          </div>
        </div>
      </div>
    </section>
  );
}
