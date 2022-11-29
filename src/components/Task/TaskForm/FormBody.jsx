import css from './FormBody.module.scss'
import { TfiPlus } from 'react-icons/tfi'
import CollectionsDropdown from './CollectionsDropdown'
import Participant from './Participant'

const formatDateDefaultValue = (date) => {
  if (date) {
    return new Date(date).toLocaleDateString('fr-CA')
  }
}

const Group = ({ children, label }) => {
  return (
    <div className={css.formGroup}>
      {label && <p>{label}</p>}
      {children}
    </div>
  )
}

const FormBody = ({ task, pendingParticipants, setPendingParticipants }) => {
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
            required
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
        <Group
          label={
            <>
              <span>Participants</span>
              <TfiPlus />
            </>
          }
        >
          <Participant
            task={task}
            pendingParticipants={pendingParticipants}
            setPendingParticipants={setPendingParticipants}
          />
        </Group>
      </div>

      <button className={cn('button button__primary', css.submitButton)}>
        {task._id ? 'Update' : 'Create'} Task
      </button>
    </div>
  )
}

export default FormBody
