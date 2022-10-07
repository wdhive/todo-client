import React from "react";
import css from "./Home.module.scss";
import avatar from "../assests/avatar.png";
import { Link } from "react-router-dom";
import downArrow from "../assests/down-arrow.svg";
import Task from "../components/Task";

export default function Home() {
  return (
    <section className="p5">
      <div className="container">
        <div className="row">
          <div className="col-2"></div>
          <div className="col-8">
            <div className={css.home}>
              <div className={css.homeHeader}>
                <div className={css.topArea}>
                  <div className={css.user}>
                    <img src={avatar} alt="" />
                    <div className={css.userInfo}>
                      <p>Good afternoon</p>
                      <h4>John Doe</h4>
                    </div>
                  </div>
                  <div className={css.dueTask}>
                    <p>Due Task</p>
                    <h4>05</h4>
                  </div>
                </div>
                <div className={css.nav}>
                  <ul>
                    <li className={css.navItem}>
                      <Link className={css.navLink} to="/">
                        All
                      </Link>
                    </li>
                    <li className={css.navItem}>
                      <Link className={css.navLink} to="/completed">
                        Completed
                      </Link>
                    </li>
                    <li className={css.navItem}>
                      <Link className={css.navLink} to="/incompleted">
                        Incompleted
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className={css.content}>
                <div className={css.filter}>
                  <div className={css.taskCount}>
                    <p> 6 tasks</p>
                  </div>
                  <div className={css.filterBy}>
                    <div className={css.type}>
                      <div className={css.filterArrow}>
                        <p>Categories</p>
                        <img src={downArrow} alt="" />{" "}
                      </div>
                      <ul className={css.cate}>
                        <li>
                          {" "}
                          <input type="radio" />
                          All
                        </li>
                        <li>
                          {" "}
                          <input type="radio" />
                          Work
                        </li>
                        <li>
                          {" "}
                          <input type="radio" />
                          Personal
                        </li>
                        <li>
                          {" "}
                          <input type="radio" />
                          Urgent
                        </li>
                      </ul>
                    </div>
                    <div className={css.type}>
                      <div className={css.filterArrow}>
                        <p>Sort By</p>
                        <img src={downArrow} alt="" />{" "}
                      </div>
                      <ul className={css.cate}>
                        <li>
                          {" "}
                          <input type="radio" />
                          Date created
                        </li>
                        <li>
                          {" "}
                          <input type="radio" />
                          Time left
                        </li>
                        <li>
                          <span className={css.line}></span>
                        </li>
                        <li>
                          {" "}
                          <input type="radio" />
                          Accending
                        </li>
                        <li>
                          {" "}
                          <input type="radio" />
                          Deccending
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <Task bg="#c6d3ec" />
                <Task bg="#d9e1f2" />
                <Task bg="#9fb5df" />
                <Task bg="#d9e1f2" />
                <Task bg="#c6d3ec" />
              </div>
            </div>
          </div>
          <div className="col-2"></div>
        </div>
      </div>
    </section>
  );
}

// import React from "react";
// import Task from "../components/Task";
// import Filter from "../components/Filter";
// import css from "../pages/Home.module.scss";
// import image from "../assests/avatar.png";
// import { Link } from "react-router-dom";

// export default function Home() {
//   return (
//     <section>
//       <div className="container">
//         <div className="row">
//           <div className="col-2"></div>
//           <div className="col-8">
//             <div className={css.home}>
//               <div className={css.headerArea}>
//                 <header>
//                   <div className="container">
//                     <div className={css.account}>
//                       <div className={css.user}>
//                         <img src={image} alt="profile_picture" />
//                         <div className={css.userInfo}>
//                           <p className={css.greeting}>Good afternoon</p>
//                           <h3 className={css.username}>Jhon Doe</h3>
//                         </div>
//                       </div>
//                       <div className={css.userIcon}>
//                         {/* <span className="material-symbols-outlined" title="Account"> account_circle </span> */}
//                         <span className="material-symbols-outlined">
//                           {" "}
//                           logout{" "}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </header>
//                 <nav className={css.nav}>
// <ul>
//   <li className={css.navItem}>
//     <Link className={css.navLink} to="/">
//       All
//     </Link>
//   </li>
//   <li className={css.navItem}>
//     <Link className={css.navLink} to="/completed">
//       Completed
//     </Link>
//   </li>
//   <li className={css.navItem}>
//     <Link className={css.navLink} to="/incompleted">
//       Incompleted
//     </Link>
//   </li>
// </ul>
//                 </nav>
//               </div>
//               <Filter />
//               <Task />
//             </div>
//           </div>
//           <div className="col-2"></div>
//         </div>
//       </div>
//     </section>
//   );
// }
