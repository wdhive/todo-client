import React from "react";
import css from "./Profile.module.scss";
import avatar from "../assests/avatar.png";
import linkIcon from "../assests/link-icon.svg";
import profile from "../assests/profile.svg";
import menuItem from "../assests/manage-category.svg";
import theme from "../assests/theme-mode.svg";
import about from "../assests/about.svg";
import FAQ from "../assests/faq.svg";
import logout from "../assests/logout.svg";
import removeUser from "../assests/remove-user.svg";
import rightArrow from "../assests/chev-right.svg";
import ProfileMenu from "../components/ProfileMenu";
import FooterNav from "../components/FooterNav";

export default function Profile() {
  return (
    <section className="p5">
      <div className="container">
        <div className="row">
          <div className="col-2"></div>
          <div className="col-8">
            <div className={css.profile}>
              <div className={css.profileInfo}>
                <img src={avatar} alt="" />
                <p className={css.profileName}>John Doe</p>
                <p className={css.profileEmail}>@johnanath_69</p>
                <div className={css.copy}>
                  Copy Handle <img src={linkIcon} alt="" />
                </div>
              </div>
              <div className={css.profileMenus}>
                <p>Preferrences</p>
                <ProfileMenu
                  icon={profile}
                  label="Account Setting"
                  arrow={rightArrow}
                  className={css.borderRadiusTop}
                />
                <ProfileMenu
                  icon={menuItem}
                  label="Manage Categories"
                  arrow={rightArrow}
                />
                <ProfileMenu
                  icon={theme}
                  label="Theme"
                  arrow={rightArrow}
                  className={css.borderRadiusBottom}
                />

                <p>Informations</p>

                <ProfileMenu
                  icon={about}
                  label="About Us"
                  arrow={rightArrow}
                  className={css.borderRadiusTop}
                />
                <ProfileMenu
                  icon={FAQ}
                  label="Help &amp; Support "
                  arrow={rightArrow}
                  className={css.borderRadiusBottom}
                />

                <p>Danger Zone</p>
                <ProfileMenu
                  icon={logout}
                  label="Log Out"
                  className={css.borderRadiusTop}
                />
                <ProfileMenu
                  icon={removeUser}
                  label="Delete Account"
                  className={css.borderRadiusBottom}
                />
              </div>
              <FooterNav />
            </div>
          </div>
          <div className="col-2"></div>
        </div>
      </div>
    </section>
  );
}
