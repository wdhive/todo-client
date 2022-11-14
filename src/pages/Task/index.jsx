import { useState } from 'react'
import css from './index.module.scss'
import NavProfile from '@com/Nav/NavProfile'
import TaskMainCategory from '@com/MainTask/MainCategory'
import TaskControls from '@com/MainTask/TaskControls'
import TaskList from '@com/MainTask/TaskList'

const Task = () => {
  const [showMainCategory, setShowMainCategory] = useState('all')
  const [showTaskCategory, setShowTaskCategory] = useState(false)
  const [sortBy, setSoryBy] = useState(false)

  console.log('Task filter:', showMainCategory, showTaskCategory, sortBy)

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

      <div className={css.taskContainer}>
        <div className="wrapper">
          <TaskControls
            taskCategories={['Work', 'Person', 'School']}
            setShowTaskCategory={setShowTaskCategory}
            setSoryBy={setSoryBy}
          />
          <TaskList />
        </div>
      </div>
    </div>
  )
}

export default Task
