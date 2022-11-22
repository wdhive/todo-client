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

  const fetchTask = (taskId, data) => {
    if (taskId) {
      return api.patch('/tasks/' + task._id, data)
    }
    return api.post('/tasks', data)
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    const [formDataRaw] = getInputs(e.currentTarget)
    const formData = getDiff(task, formDataRaw)
    formData.endingDate ||= null

    const data = await fetchTask(task._id, formData)
    if (!data) return
    $store(tasksSlice.addTask(data.task))
    task._id || navigate(`/tasks/${data.task._id}`)
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
