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

const formatDateDefaultValue = (date) => {
  if (date) {
    return new Date(date).toLocaleDateString('fr-CA')
  }
}

const FormBody = ({ task }) => {
  console.log(task)

  return (
    <div className={css.TaskForm}>
      <Group label="Task Title">
        <input
          type="text"
          name="title"
          defaultValue={task.title}
          required
          placeholder="Great Task..."
        />
      </Group>

      <div className={css.taskDateGroup}>
        <Group label="Starts">
          <input
            type="date"
            name="startingDate"
            defaultValue={formatDateDefaultValue(task.startingDate)}
          />
        </Group>
        <Group label="Ends">
          <input
            type="date"
            name="endingDate"
            defaultValue={formatDateDefaultValue(task.endingDate)}
          />
        </Group>
      </div>

      <Group label="Description">
        <textarea
          name="description"
          rows="5"
          defaultValue={task.description}
          placeholder="I have to do this for my..."
          required
        />
      </Group>

      <div className={css.taskCollection}>
        <Group label="Collection">
          <CollectionsDropdown collection={task.collection} />
        </Group>
      </div>

      <div className={css.taskParticipants} name="participants">
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
