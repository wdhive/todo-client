import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import TaskNew from './TaskNew';
import TaskUpdate from './TaskUpdate';

const Task = () => {
  return (
    <>
      <h1>Task Root</h1>;
      <Routes>
        <Route path="/" element={<Outlet />}>
          <Route path="new" element={<TaskNew />} />
          <Route path=":taskId" element={<TaskUpdate />} />
          <Route path="*" element={<Navigate to="/tasks" />} />
        </Route>
      </Routes>
    </>
  );
};

export default Task;
