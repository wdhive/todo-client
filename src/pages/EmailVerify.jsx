import React from "react";
import ImageContainer from "../components/ImageContainer";
import EmailVerifyForm from "../components/EmailVerifyForm";
import css from "./Signup.module.scss";

export default function EmailVerify() {
  return (
    <section id={css.form}>
      <div className="container">
        <div className="row">
          <div className="col-6">
            <ImageContainer />
          </div>
          <div className="col-6">
            <EmailVerifyForm />
          </div>
        </div>
      </div>
    </section>
  );
}
