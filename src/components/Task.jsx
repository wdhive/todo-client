import React from "react";
import image from "../assests/avatar.png";
import clock from "../assests/clock.svg";
import css from "./Task.module.scss";

const Task = ({ bg }) => {
  return (
    <div className={css.task} style={{ backgroundColor: bg }}>
      <div className={css.taskName}>
        <h3>Task 1</h3>
        <label className={css.formControl}>
          <input type="checkbox" name="checkbox" />
          <span className={css.checkmark}></span>
        </label>
      </div>
      <div className={css.taskDesc}>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet
          voluptatem magni iusto nostrum temporibus facilis, ducimus consequatur
          nam sed inventore.
        </p>
        <span className={css.line}></span>
      </div>
      <div className={css.time}>
        <img src={clock} alt="" />
        <p>09: 30am - 12: 00 pm </p>
        <div className={css.images}>
          <img src={image} alt="image" />
          <img src={image} alt="image" />
          <img src={image} alt="image" />
        </div>
      </div>
    </div>
  );
};

export default Task;
