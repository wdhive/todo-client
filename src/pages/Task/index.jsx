import { useState } from 'react'
import css from './index.module.scss'
import NavProfile from '$components/Nav/NavProfile'
import TaskMainCategory from '$components/Task/MainCategory'
import TaskControls from '$components/Task/TaskControls'
import TaskItem from '$components/Task/Task'
import { useMemo } from 'react'

const Task = ({ tasks }) => {
  const [showMainCategory, setShowMainCategory] = useState('all')
  const [showTaskCategory, setShowTaskCategory] = useState(false)
  const [sortBy, setSoryBy] = useState(false)

  // console.log('Task filter:', showMainCategory, showTaskCategory, sortBy)

  const tasksList = useMemo(() => {
    return tasks.map((el) => <TaskItem key={el} />)
  }, [tasks])

  return (
    <div className={css.Task}>
      <header className={css.header}>
        <div className="wrapper">
          <NavProfile className={css.navProfile} />
          <TaskMainCategory
            showTaskCategory={showMainCategory}
            setShowTaskCategory={setShowMainCategory}
          />
        </div>
      </header>

      <div className="scroll-inside-flex">
        <div className="wrapper">
          <TaskControls
            taskCategories={['Work', 'Person', 'School']}
            setShowTaskCategory={setShowTaskCategory}
            setSoryBy={setSoryBy}
            taskCount={tasks.length}
          />

          <div className={css.taskList}>{tasksList}</div>
        </div>
      </div>
    </div>
  )
}

export default Task
