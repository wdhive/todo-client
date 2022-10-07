import React from "react";
import ImageContainer from "../components/ImageContainer";
import ChangePasswordForm from "../components/ChangePasswordForm";
import css from "./Signup.module.scss";

export default function ChangePassword() {
  return (
    <section id={css.form}>
      <div className="container">
        <div className="row">
          <div className="col-6">
            <ImageContainer />
          </div>
          <div className="col-6">
            <ChangePasswordForm />
          </div>
        </div>
      </div>
    </section>
  );
}
