import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Loading from '$components/Loading'
import Task from './index'
import TaskNew from './TaskNew'
import TaskUpdate from './TaskUpdate'
import taskSlice from '$slice/tasks'
import { useSelector } from 'react-redux'

const TaskLayout = () => {
  const tasks = useSelector((state) => state.tasks.tasks)

  const api = useApiOnce('get', '/tasks')
  api.onLoad((data) => {
    $store(taskSlice.initTasks(data.tasks))
  })

  if (!api.loaded) return <Loading />

  return (
    <>
      <Task tasks={tasks} />

      <Routes>
        <Route index element={<></>} />
        <Route path="new" element={<TaskNew />} />
        <Route path=":taskId" element={<TaskUpdate />} />
        <Route path="*" element={<Navigate replace to="/tasks" />} />
      </Routes>
    </>
  )
}

export default TaskLayout
