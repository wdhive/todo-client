import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import { Routes, Route, Navigate } from 'react-router-dom'

import Task from './index'
import TaskModal from './TaskModal'

const TaskLayout = () => {
  const tasks = useSelector((state) => state.tasks.tasks)

  return (
    <>
      <Task tasks={tasks} />

      <Routes>
        <Route index element={<></>} />
        <Route path=":taskId" element={<TaskModal />} />
        <Route path="*" element={<Navigate replace to="/tasks" />} />
      </Routes>
    </>
  )
}

export default memo(TaskLayout)
