import React from "react";

const Filter = () => {
  return (
    <>
      <div className="filter">
        <div className="task-count">
          <p> 6 tasks</p>
        </div>
        <div className="filter-by">
          <div className="type">
            <div className="filter-arrow">
              <p>Categories</p>
              <span className="material-symbols-outlined"> expand_more </span>
            </div>
            <ul className="cate">
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
          <div className="type">
            <div className="filter-arrow">
              <p>Sort By</p>
              <span className="material-symbols-outlined"> expand_more </span>
            </div>
            <ul className="cate">
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
                <span className="line"></span>
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
    </>
  );
};

export default Filter;
