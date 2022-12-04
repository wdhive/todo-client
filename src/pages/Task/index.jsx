import { useMemo, memo, useState } from 'react'
import css from './index.module.scss'
import NavProfile from '$components/Nav/NavProfile'
import TaskMainCategory from '$components/Task/MainCategory'
import TaskControls from '$components/Task/TaskControls'
import TaskCard from '$components/Task/TaskCard'
import useTaskCollections from '$hooks/useTaskCollections'

const Task = ({ tasks }) => {
  const collections = useTaskCollections()
  const [sortBy, setSoryBy] = useState('d')
  const [taskStatus, setTaskStatus] = useState('all')
  const [taskCollection, setTaskCollection] = useState('none')

  const tasksList = useMemo(() => {
    const sortedTasks = [...tasks].sort((a, b) => {
      const createdAt1 = new Date(a.createdAt).valueOf()
      const createdAt2 = new Date(b.createdAt).valueOf()

      if (sortBy === 'd') return createdAt2 - createdAt1
      return createdAt1 - createdAt2
    })

    const finalResults = []

    sortedTasks.forEach((task) => {
      const passCollection =
        taskCollection === 'none' || task.collection === taskCollection

      const passStatus =
        taskStatus === 'all' ||
        (taskStatus === 'completed' && task.completed) ||
        (taskStatus === 'incomplete' && !task.completed)

      if (!(passCollection && passStatus)) return
      const item = <TaskCard key={task._id} task={task} />
      finalResults.push(item)
    })

    return finalResults
  }, [tasks, taskCollection, sortBy, taskStatus])

  return (
    <div className={css.Task}>
      <header className={css.header}>
        <div className="wrapper">
          <NavProfile hideTheme column hideOnPc showToggleTheme />
          <TaskMainCategory
            showTaskCategory={taskStatus}
            setShowTaskCategory={setTaskStatus}
          />
        </div>
      </header>

      <div className={cn('scroll-inside-flex', css.formContainer)}>
        <div className="wrapper">
          <TaskControls
            collections={collections}
            taskCollection={taskCollection}
            setTaskCollection={setTaskCollection}
            sortBy={sortBy}
            setSoryBy={setSoryBy}
            taskCount={tasksList.length}
          />

          <div className={css.taskList}>{tasksList}</div>
        </div>
      </div>
    </div>
  )
}

export default memo(Task)
