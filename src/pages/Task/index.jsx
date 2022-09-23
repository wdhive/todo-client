import { Outlet } from 'react-router-dom';
const Task = () => {
  return (
    <>
      <h1>Task Root</h1>;
      <Outlet />
    </>
  );
};

export default Task;
