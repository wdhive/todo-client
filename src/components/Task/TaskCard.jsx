import { memo, useMemo } from 'react'
import { useSelector } from 'react-redux'
import useActiveState from 'use-active-state'
import { useNavigate } from 'react-router-dom'
import { FaRegEdit, FaRegTrashAlt, FaRegClock } from 'react-icons/fa'
import useApi from '$api/useApi'
import Task from '$slice/Tasks'
import useTaskPermission from '$hooks/useTaskPermission'

import Checkbox from '$ui/Checkbox'
import css from './TaskCard.module.scss'
import Modal from '$ui/Uncontrolled/Modal'

const TaskCard = ({ task }) => {
  const api = useApi()
  const [show, toggleShow] = useActiveState()
  const navigate = useNavigate()
  const taskPerm = useTaskPermission(task)
  const userId = useSelector((state) => state.user?.user?._id)

  const collection = useSelector(
    (state) =>
      state.settings?.collections?.find((col) => col._id === task.collection)
        ?.name
  )

  const taskStartingTime = new Date(task.startingDate).toDateString()
  const taskEndingTime =
    task.endingDate && new Date(task.endingDate).toDateString()

  const handleContextMenu = (e) => {
    e.stopPropagation()
    e.preventDefault()
    toggleShow()
  }

  const handleCheckClick = async () => {
    const url = `/tasks/${task._id}/${
      task.completed ? 'uncomplete' : 'complete'
    }`
    const data = await api.patch(url)
    if (!data) return
    $store(Task.updateTask(data.task))
  }

  const handleEditClick = () => navigate(`/tasks/${task._id}`)

  const handleDeleteClick = async () => {
    const modal = await Modal({
      description: taskPerm.isOwner
        ? 'This task will be deleted'
        : 'This will remove you from this task',
    })
    if (!modal.result) return modal.close()

    const deleteTaskUrl = `/tasks/${task._id}`
    const leftTaskUrl = deleteTaskUrl + '/invitation'

    const data = await api.delete(
      taskPerm.isOwner ? deleteTaskUrl : leftTaskUrl
    )

    modal.close()
    if (!data) return
    $store(Task.deleteTask(task._id))
  }

  const handleFocus = () => toggleShow(true)
  const handleBlur = () => toggleShow(false)

  const taskImages = useMemo(() => {
    const taskTotalParticipants = [
      ...task.participants,
      {
        active: true,
        user: task.owner,
      },
    ]

    const filteredParticipants = taskTotalParticipants
      .filter(
        ({ user, active }) => !(!active || userId === user._id) && user.avatar
      )
      .reverse()
      .slice(0, 5)

    return filteredParticipants.map(({ user }) => {
      return <img key={user._id} alt={user.name} src={user.avatar} />
    })
  }, [task, userId])

  return (
    <div
      className={cn(
        css.Task,
        show && css.contextActive,
        task.completed && css.completed
      )}
      onContextMenu={handleContextMenu}
    >
      <div className={css.main}>
        <div className={css.top}>
          <div className={css.title}>
            <h6>{task.title}</h6>
            {collection && <span>({collection})</span>}
          </div>

          <Checkbox
            className={css.checkBox}
            checked={task.completed}
            loading={api.loading}
            disabled={api.loading}
            onClick={handleCheckClick}
          />
        </div>

        <p className={css.middle}>{task.description?.slice(0, 100)}</p>

        <div className={css.bottom}>
          <div className={css.time}>
            <FaRegClock />
            <p>
              {taskStartingTime} {taskEndingTime && ' - ' + taskEndingTime}
            </p>
          </div>

          <div className={css.users}>{taskImages}</div>
        </div>
      </div>

      <div className={css.backdrop} />

      <div className={css.context}>
        <button
          className="button"
          onFocus={handleFocus}
          onBlur={handleBlur}
          onClick={handleEditClick}
        >
          <FaRegEdit />
        </button>
        <button
          onClick={handleDeleteClick}
          className="button"
          onFocus={handleFocus}
          onBlur={handleBlur}
        >
          <FaRegTrashAlt />
        </button>
      </div>
    </div>
  )
}

export default memo(TaskCard)
