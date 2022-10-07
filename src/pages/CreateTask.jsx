import React from "react";
import css from "./CreateTask.module.scss";
import Input from "../components/Input";
import close from "../assests/close.svg";
import plus from "../assests/plus.svg";
import calendar from "../assests/calendar.svg";
import Button from "../components/Button";
import Participant from "../components/Participant";
// import { Link } from "react-router-dom";

export default function CreateTask() {
  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col-2"></div>
          <div className="col-8">
            <div className={css.createTask}>
              <div className={css.heading}>
                <h2>Create Task</h2>
                <img src={close} alt="" />
              </div>
              <form className={css.form}>
                <label className={css.label}>Task Title</label>
                <Input type="text" placeholder="Title Here..." />
                <div className={css.inputGroup}>
                  <div>
                    <label className={css.label}>Starts</label>
                    <Input
                      type="text"
                      placeholder="15 May, 11:30 AM"
                      icon={calendar}
                    />
                  </div>
                  <div>
                    <label className={css.label}>Ends</label>
                    <Input
                      type="text"
                      placeholder="15 May, 12:45 AM"
                      icon={calendar}
                    />
                  </div>
                </div>
                <label className={css.label}>Description</label>
                <textarea
                  name="desc"
                  placeholder="Description Here..."
                  id={css.textarea}
                ></textarea>
                <div className={css.categories}>
                  <label className={css.label}>Category</label>
                  <div className={css.select}>
                    <select name="select" id="selectCate">
                      <option value="">[hue (ex:220)] Name...</option>
                      <option value="work">Work</option>
                      <option value="personal">Personal</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                </div>
                <div className={css.participantsTitle}>
                  <label className={css.label}>Participants</label>
                  <img src={plus} alt="" />
                </div>
                <Participant />
                <Participant />
                <Participant />
                <Button className="fullWidthBtn btn2">Create Task</Button>
              </form>
            </div>
          </div>
          <div className="col-2"></div>
        </div>
      </div>
    </section>
  );
}
