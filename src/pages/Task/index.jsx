import { Routes, Route, Navigate } from 'react-router-dom';
import TaskRoot from './Root';
import TaskNew from './TaskNew';
import TaskUpdate from './TaskUpdate';

const Task = () => {
  return (
    <>
      <TaskRoot />
      <Routes>
        <Route path="new" element={<TaskNew />} />
        <Route path=":taskId" element={<TaskUpdate />} />
        <Route path=":notInUse/*" element={<Navigate to="/tasks" />} />
      </Routes>
    </>
  );
};

export default Task;
