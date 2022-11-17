import { useParams } from 'react-router'
import { useSelector } from 'react-redux'
import css from './index.module.scss'
import CloseIcon from '$assets/icons/cross.svg?component'
import { getInputs } from '$src/utils/utils'
import FormBody from './FormBody'

const defaulTask = {
  get startingDate() {
    return Date.now()
  },
  collection: 'none',
}

const TaskForm = ({ close }) => {
  const params = useParams()
  const task = useSelector((state) => {
    return (
      state.tasks.tasks?.find(({ _id }) => {
        return params.taskId === _id
      }) ?? defaulTask
    )
  })

  const handleFormSubmit = (e) => {
    const [data] = getInputs(e.currentTarget)

    console.log(data)
    e.preventDefault()
  }

  return (
    <div className={css.TaskForm}>
      <div className={css.header}>
        <div className="wrapper">
          <h6>{task.title ? 'Update' : 'Create'} Task</h6>
          <button onClick={close}>
            <CloseIcon />
          </button>
        </div>
      </div>

      <form
        className={cn('scroll-inside-flex', css.body)}
        onSubmit={handleFormSubmit}
      >
        <div className="wrapper">
          <FormBody task={task} />
        </div>
      </form>
    </div>
  )
}

export default TaskForm
