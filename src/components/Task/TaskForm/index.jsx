import { useState } from 'react'
import { useParams } from 'react-router'
import { useSelector } from 'react-redux'
import css from './index.module.scss'
import { getDiff, getInputs } from '$src/utils/utils'
import FormBody from './FormBody'
import useApi from '$src/api/useApi'
import tasksSlice from '$src/store/slice/tasks'
import { useNavigate } from 'react-router-dom'
import { TfiPlus } from 'react-icons/tfi'

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
  const [pendingParticipants, setPendingParticipants] = useState(() => [])

  const task = useSelector((state) => {
    return (
      state.tasks.tasks?.find(({ _id }) => {
        return params.taskId === _id
      }) ?? defaulTask
    )
  })

  console.log(task)

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    const [formDataRaw] = getInputs(e.currentTarget)
    const formData = getDiff(task, formDataRaw)

    formData.endingDate ||= null
    if (formData.collection === 'none') {
      formData.collection = null
    }
    if (pendingParticipants.length) {
      formData.participants = pendingParticipants.map((participant) => ({
        user: participant.user._id,
        role: participant.role,
      }))
    }

    if (task._id) {
      const data = await api.patch('/tasks/' + task._id, formData)
      $store(tasksSlice.updateTask(data.task))
    } else {
      const data = await api.post('/tasks', formData)
      $store(tasksSlice.addTask(data.task))
      navigate(`/tasks/${data.task._id}`)
    }

    setPendingParticipants([])
  }

  return (
    <div className={css.TaskForm}>
      <div className={css.header}>
        <div className="wrapper">
          <h6>{task.title ? 'Update' : 'Create'} Task</h6>
          <button onClick={close}>
            <TfiPlus />
          </button>
        </div>
      </div>

      <form className={css.body} onSubmit={handleFormSubmit}>
        <div className="wrapper">
          <FormBody
            task={task}
            pendingParticipants={pendingParticipants}
            setPendingParticipants={setPendingParticipants}
          />
        </div>
      </form>
    </div>
  )
}

export default TaskForm
