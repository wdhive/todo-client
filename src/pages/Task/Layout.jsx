import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import { Routes, Route, Navigate } from 'react-router-dom'
import taskSlice from '$slice/tasks'
import Loading from '$components/Loading'
import Task from './index'
import TaskModal from './TaskModal'
import useApiOnce from '$src/api/useApiOnce'

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
        <Route path=":taskId" element={<TaskModal />} />
        <Route path="*" element={<Navigate replace to="/tasks" />} />
      </Routes>
    </>
  )
}

export default memo(TaskLayout)
