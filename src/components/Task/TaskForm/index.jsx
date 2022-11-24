import { useParams } from 'react-router'
import { useSelector } from 'react-redux'
import css from './index.module.scss'
import CloseIcon from '$assets/icons/cross.svg?component'
import { getDiff, getInputs } from '$src/utils/utils'
import FormBody from './FormBody'
import useApi from '$src/api/useApi'
import tasksSlice from '$src/store/slice/tasks'
import { useNavigate } from 'react-router-dom'

const defaulTask = {
  get startingDate() {
    return Date.now()
  },
  collection: 'none',
}

const TaskForm = ({ close }) => {
  const api = useApi()
  const params = useParams()
  const navigate = useNavigate()

  const task = useSelector((state) => {
    return (
      state.tasks.tasks?.find(({ _id }) => {
        return params.taskId === _id
      }) ?? defaulTask
    )
  })

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    const [formDataRaw] = getInputs(e.currentTarget)
    const formData = getDiff(task, formDataRaw)

    formData.endingDate ||= null
    if (formData.collection === 'none') {
      formData.collection = null
    }

    if (task._id) {
      const data = await api.patch('/tasks/' + task._id, formData)
      return $store(tasksSlice.updateTask(data.task))
    }

    const data = await api.post('/tasks', formData)
    $store(tasksSlice.addTask(data.task))
    navigate(`/tasks/${data.task._id}`)
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

      <form className={css.body} onSubmit={handleFormSubmit}>
        <div className="wrapper">
          <FormBody task={task} />
        </div>
      </form>
    </div>
  )
}

export default TaskForm
