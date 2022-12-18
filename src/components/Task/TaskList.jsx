import css from './TaskList.module.scss'
import TaskCard from './TaskCard'
import { useMemo } from 'react'

const TaskList = ({ tasks }) => {
  const renderedTask = useMemo(() => {
    return tasks.map((task) => <TaskCard key={task._id} task={task} />)
  }, [tasks])

  return <div className={css.TaskList}>{renderedTask}</div>
}

export default TaskList
