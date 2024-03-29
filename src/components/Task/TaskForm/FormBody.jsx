import css from './FormBody.module.scss'
import { TfiPlus } from 'react-icons/tfi'
import CollectionsDropdown from './CollectionsDropdown'
import Participant from './Participant'
import Button from '$ui/Button'
import useTaskPermission from '$hooks/useTaskPermission'

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

const FormBody = ({ task, api, ...props }) => {
  const taskPerm = useTaskPermission(task)

  return (
    <div className={css.TaskForm}>
      {taskPerm.isAdmin && (
        <>
          <Group label="Task Title">
            <input
              type="text"
              name="title"
              defaultValue={task.title}
              required
              placeholder="Great Task..."
            />
          </Group>

          <Group label="Description">
            <textarea
              name="description"
              rows="5"
              defaultValue={task.description}
              placeholder="I have to do this for my..."
              required
            />
          </Group>

          <div className={css.taskDateGroup}>
            <Group label="Task end date">
              <input
                type="date"
                name="endingDate"
                defaultValue={formatDateDefaultValue(task.endingDate)}
              />
            </Group>
          </div>
        </>
      )}

      <div className={css.taskCollection}>
        <Group label="Collection">
          <CollectionsDropdown collection={task.collection} />
        </Group>
      </div>

      {taskPerm.isOwner && (
        <div className={css.taskParticipants} name="participants">
          <Group
            label={
              <>
                <span>Participants</span>
                <TfiPlus />
              </>
            }
          >
            <Participant {...props} task={task} />
          </Group>
        </div>
      )}

      <Button
        className={cn('button__primary', css.submitButton)}
        loading={api.loading}
      >
        {task._id ? 'Update' : 'Create'} Task
      </Button>
    </div>
  )
}

export default FormBody
