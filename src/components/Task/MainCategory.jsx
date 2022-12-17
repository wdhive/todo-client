import { memo } from 'react'

import css from './MainCategory.module.scss'

const MainTaskCategory = ({ showTaskCategory, setShowTaskCategory }) => {
  const TaskCategoryButton = ({ children }) => {
    const handleClick = () => {
      setShowTaskCategory(children)
    }

    return (
      <button
        onClick={handleClick}
        className={
          showTaskCategory === children ? css.taskActiveCategory : undefined
        }
      >
        {children}
      </button>
    )
  }

  return (
    <div className={css.taskCategories}>
      <TaskCategoryButton>all</TaskCategoryButton>
      <TaskCategoryButton>completed</TaskCategoryButton>
      <TaskCategoryButton>incomplete</TaskCategoryButton>

      <div className={css.taskActiveCategoryLine}></div>
    </div>
  )
}

export default memo(MainTaskCategory)
