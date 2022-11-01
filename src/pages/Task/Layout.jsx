import { Routes, Route, Navigate } from 'react-router-dom'
import TaskNew from './TaskNew'
import TaskUpdate from './TaskUpdate'

const TaskLayout = () => {
  return (
    <>
      <Routes>
        <Route path="new" element={<TaskNew />} />
        <Route path=":taskId" element={<TaskUpdate />} />

        <Route index element={<Navigate to="/" />} />
        <Route path=":notInUse/*" element={<Navigate to="/" />} />
      </Routes>
    </>
  )
}

export default TaskLayout
