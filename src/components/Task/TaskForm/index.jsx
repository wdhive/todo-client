import { useState } from 'react'
import { useParams } from 'react-router'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { TfiPlus } from 'react-icons/tfi'
import useApi from '$api/useApi'
import tasksSlice from '$slice/Tasks'
import css from './index.module.scss'
import { getDiff, getInputs } from '$utils/utils'
import FormBody from './FormBody'

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

  const userId = useSelector((state) => state.user.user._id)
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

    if (pendingParticipants.length) {
      for (let key in formData) {
        if (key.startsWith('participant ')) {
          const [, user] = key.split(' ')
          const role = formData[key]
          delete formData[key]

          formData.participants ||= []
          formData.participants.push({ user, role })
        }
      }
    }

    if (task._id) {
      const data = await api.patch('/tasks/' + task._id, formData)
      if (!data) return
      setPendingParticipants([])
      return $store(tasksSlice.updateTask(data.task))
    }

    const data = await api.post('/tasks', formData)
    if (!data) return
    setPendingParticipants([])
    $store(tasksSlice.addTask(data.task))
    navigate(`/tasks/${data.task._id}`)
  }

  return (
    <>
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
            api={api}
            task={task}
            pendingParticipants={pendingParticipants}
            setPendingParticipants={setPendingParticipants}
          />
        </div>
      </form>
    </>
  )
}

export default TaskForm
