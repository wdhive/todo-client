import React from "react";
import Button from "../components/Button";
import Header from "../components/Header";
import css from "./LandingPage.module.scss";

export default function LandingPage() {
  return (
    <>
      <Header />
      <section className="p5">
        <div className="container">
          <div className="row p3">
            <div className="col-6">
              <div className={css.contentLeft}>
                <div className={css.title}>
                  <h1>Smash all of your ideas into one place</h1>
                </div>
                <div className={css.desc}>
                  <span>Collaborate</span> with your <span>firends</span> to
                  help you make your journey of bringing them to live a bit more{" "}
                  <span>fun</span>
                </div>
                <div className={css.btnGroup}>
                  <Button className="btn2">Sign up</Button>
                  <Button className="btn1">Continue anyways</Button>
                </div>
                <div className={css.message}>
                  <p>
                    <span>69</span> people are already enjoying our app
                  </p>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className={css.desktopView}>
                <div className={css.freddy}></div>
                <div className={css.eye}></div>
                <div className={css.eyeBall}></div>
                <div className={css.desktopText}>
                  <p>A screenshot of the</p>
                  <p>desktop view</p>
                </div>
                <div className={css.mobileView}>
                  <p>A screenshot of the mobile view</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
