import { memo, useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import filterTask from './filterTask'

import TaskControls from '$components/Task/TaskControls'
import TaskList from '$components/Task/TaskList'

const SearchMain = ({ setSortBy, ...props }) => {
  const tasks = useSelector((state) => state.tasks.tasks)

  const filteredTask = useMemo(
    () => filterTask([...tasks], props) || [],
    [tasks, JSON.stringify(props)]
  )

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
