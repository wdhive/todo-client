import { useState } from 'react'
import css from './index.module.scss'
import NavProfile from '@com/Nav/NavProfile'
import TaskMainCategory from '@com/Task/MainCategory'
import TaskControls from '@com/Task/TaskControls'
import TaskItem from '@com/Task/Task'

const Task = () => {
  const [showMainCategory, setShowMainCategory] = useState('all')
  const [showTaskCategory, setShowTaskCategory] = useState(false)
  const [sortBy, setSoryBy] = useState(false)

  // console.log('Task filter:', showMainCategory, showTaskCategory, sortBy)

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
          />

          <div className={css.taskList}>
            {[0, 1, 2, 3, 34, 354, 3654, 345, 38, 47, 384, 423, 453, 4243, 64].map((el) => (
              <TaskItem key={el} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Task
