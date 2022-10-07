import React from "react";
import ImageContainer from "../components/ImageContainer";
import SignupForm from "../components/SignupForm";
import css from "./Signup.module.scss";

export default function Signup() {
  return (
    <section id={css.form}>
      <div className="container">
        <div className="row">
          <div className="col-6">
            <ImageContainer />
          </div>
          <div className="col-6">
            <SignupForm />
          </div>
        </div>
      </div>
    </section>
  );
}
