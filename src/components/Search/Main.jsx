import { memo, useState } from 'react'

import css from './Main.module.scss'
import TaskControls from '$components/Task/TaskControls'
import TaskList from '$components/Task/TaskList'
import { useSelector } from 'react-redux'

const SearchMain = ({
  searchQuery,
  selectedFilter,
  selectedCollections,
  selectedParticipants,
}) => {
  const tasks = useSelector((state) => state.tasks.tasks)
  const [sortBy, setSortBy] = useState('a')

  console.log(
    searchQuery,
    sortBy,
    selectedFilter,
    selectedCollections,
    selectedParticipants
  )

  return (
    <div>
      <TaskControls sortBy={sortBy} setSoryBy={setSortBy} />

      <div>
        <TaskList tasks={tasks} />
      </div>
    </div>
  )
}

export default memo(SearchMain)
