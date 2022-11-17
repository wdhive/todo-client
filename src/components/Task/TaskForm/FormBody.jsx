import css from './FormBody.module.scss'
import AddIcon from '$assets/icons/add.svg?component'
import CollectionsDropdown from './CollectionsDropdown'

const Group = ({ children, label }) => {
  return (
    <div className={css.formGroup}>
      {label && <p>{label}</p>}
      {children}
    </div>
  )
}

const FormBody = ({}) => {
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

      <div className={css.taskCollection}>
        <Group label="Collection">
          <CollectionsDropdown />
        </Group>
      </div>

      <div className={css.taskParticipants}>
        <Group label="Participants">
          <AddIcon />
        </Group>
      </div>

      <button className={cn('button button__primary', css.submitButton)}>
        Click Me
      </button>
    </div>
  )
}

export default FormBody
