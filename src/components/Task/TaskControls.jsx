import { useId } from 'react'
import DropdownOld from '../UI/DropdownOld'
import css from './TaskControls.module.scss'

const Group = ({ name, label, value, selected }) => {
  const id = useId()

  return (
    <label htmlFor={id} className={css.inputGroup}>
      <input
        type="radio"
        name={name}
        id={id}
        value={value}
        defaultChecked={selected === value}
      />

      <span>{label}</span>
    </label>
  )
}

const TaskControls = ({
  collections,
  taskCollection,
  setTaskCollection,
  sortBy,
  setSoryBy,
  taskCount,
}) => {
  const handleCategoryFormSubmit = ({ currentTarget }) => {
    const value = currentTarget.elements.category.value
    setTaskCollection(value)
  }
  const handleSortFormSubmit = ({ currentTarget }) => {
    const value = currentTarget.elements.sort.value
    setSoryBy(value)
  }

  return (
    <div className={css.TaskControls}>
      <p className={css.taskCount}>
        {taskCount > 0 ? (
          <>
            <span>{taskCount}</span>
            {(taskCount === 1 ? ' task' : ' tasks') + ' found'}
          </>
        ) : (
          'No tasks found'
        )}
      </p>

      <div className={css.controls}>
        <DropdownOld
          title="Collection"
          align="right"
          className={css.dropdown}
          bodyClassName={css.dropdownBody}
          buttonClassName={css.dropdownButton}
          onChange={handleCategoryFormSubmit}
        >
          {collections?.map(({ _id, name }) => (
            <Group
              key={_id}
              name="category"
              label={name}
              value={_id}
              selected={taskCollection}
            />
          ))}
        </DropdownOld>

        <DropdownOld
          title="Sort By"
          align="right"
          className={css.dropdown}
          bodyClassName={css.dropdownBody}
          buttonClassName={css.dropdownButton}
          onChange={handleSortFormSubmit}
        >
          <Group name="sort" label="Accending" value="a" selected={sortBy} />
          <Group name="sort" label="Deccending" value="d" selected={sortBy} />
        </DropdownOld>
      </div>
    </div>
  )
}

export default TaskControls
