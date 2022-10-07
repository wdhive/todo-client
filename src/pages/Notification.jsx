import React from "react";
import FooterNav from "../components/FooterNav";
import css from "./Notification.module.scss";

export default function Notification() {
  return (
    <section className="p5">
      <div className="container">
        <div className="row">
          <div className="col-2"></div>
          <div className="col-8">
            <div className={css.notification}>
              <div className={css.notificationHeading}>
                <h2>Notifications</h2>
                <p>Clear All</p>
              </div>
              <div className={css.allNotifications}></div>
              <FooterNav />
            </div>
          </div>
          <div className="col-2"></div>
        </div>
      </div>
    </section>
  );
}
