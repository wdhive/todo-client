import { memo, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import useEffectExceptOnMount from 'use-effect-except-on-mount'
import filterTask from './filterTask'

import TaskControls from '$components/Task/TaskControls'
import TaskList from '$components/Task/TaskList'

const SearchMain = ({ setSortBy, ...props }) => {
  const tasks = useSelector((state) => state.tasks.tasks)
  const [filteredTask, setFilteredTask] = useState([])

  const updateTasks = () => {
    setFilteredTask(filterTask([...tasks], props) || [])
  }

  useEffect(updateTasks, [])
  useEffectExceptOnMount(() => {
    const timeout = setTimeout(updateTasks, 350)
    return () => clearTimeout(timeout)
  }, [tasks, JSON.stringify(props)])

  return (
    <div>
      <TaskControls
        sortBy={props.sortBy}
        setSortBy={setSortBy}
        taskCount={filteredTask.length}
      />

      <div>
        <TaskList tasks={filteredTask} />
      </div>
    </div>
  )
}

export default memo(SearchMain)
