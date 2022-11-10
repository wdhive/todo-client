import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Task from './index'
import TaskNew from './TaskNew'
import TaskUpdate from './TaskUpdate'

const TaskLayout = () => {
  return (
    <>
      <Task />

      <Routes>
        <Route path="new" element={<TaskNew />} />
        <Route path=":taskId" element={<TaskUpdate />} />
        <Route path=":404/*" element={<Navigate replace to="/tasks" />} />
      </Routes>
    </>
  )
}

export default TaskLayout
