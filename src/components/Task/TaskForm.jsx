import { useState } from 'react'
import css from './TaskForm.module.scss'
import AddIcon from '$assets/icons/add.svg?component'
import Dropdown from '$components/UI/Dropdown'
import TaskFormCategories from './TaskFormCategories'

const Group = ({ children, label }) => {
  return (
    <div className={css.formGroup}>
      {label && <p>{label}</p>}
      {children}
    </div>
  )
}

const TaskForm = () => {
  const [activeCategory, setActiveCategory] = useState('What Ever')

  return (
    <div className={css.TaskForm}>
      <Group label="Task Title">
        <input type="text" name="title" />
      </Group>

      <div className={css.taskDateGroup}>
        <Group label="Starts">
          <input type="date" name="start" />
        </Group>
        <Group label="Ends">
          <input
            type="date"
            name="end"
            defaultValue={new Date().toLocaleDateString('fr-CA')}
          />
        </Group>
      </div>

      <Group label="Description">
        <textarea name="description" rows="5"></textarea>
      </Group>

      <div className={css.taskCategory}>
        <Group label="Category">
          <Dropdown title={activeCategory} form={false} align="right">
            {[0, 1, 2].map((el) => (
              <TaskFormCategories category={el} key={el} />
            ))}
          </Dropdown>
        </Group>
      </div>

      <div className={css.taskParticipants}>
        <Group label="Participants">
          <AddIcon />
        </Group>
      </div>
    </div>
  )
}

export default TaskForm
