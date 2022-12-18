import { memo } from 'react'

import css from './TaskControls.module.scss'
import Dropdown from '$ui/Dropdown'

const Item = ({ label }) => {
  return (
    <div className={css.label}>
      <div className={css.radio} />
      <p>{label}</p>
    </div>
  )
}

const TaskControls = ({
  collections,
  setTaskCollection,
  taskCollection,

  sortBy,
  setSoryBy,

  taskCount,
}) => {
  const commonprops = {
    live: false,
    className: css.dropdown,
    classNames: {
      button: css.dropdownButton,
      section: css.dropdownSection,
      ul: css.dropdownBody,
      li: css.inputGroup,
    },
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
        {collections && (
          <Dropdown
            {...commonprops}
            label="Collection"
            default={taskCollection}
            onChange={(value) => setTaskCollection(value)}
            list={collections.map(({ _id, name }) => ({
              value: _id,
              label: <Item label={name} />,
            }))}
          />
        )}

        <Dropdown
          {...commonprops}
          label="Sort By"
          default={sortBy}
          onChange={(value) => setSoryBy(value)}
          list={[
            {
              label: <Item label="Accending" />,
              value: 'a',
            },
            {
              label: <Item label="Deccending" />,
              value: 'd',
            },
          ]}
        />
      </div>
    </div>
  )
}

export default memo(TaskControls)
