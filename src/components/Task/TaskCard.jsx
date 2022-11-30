import { memo, useId } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import useActiveState from 'use-active-state'
import css from './TaskCard.module.scss'
import { FaRegEdit, FaRegTrashAlt, FaRegClock, FaCheck } from 'react-icons/fa'
import avatar from '$assets/avatar.png'
import useApi from '$src/api/useApi'
import tasksSlice from '$src/store/slice/tasks'

const TaskCard = ({ task }) => {
  const uniqueId = useId()
  const api = useApi()
  const [show, toggleShow] = useActiveState()
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
    $store(tasksSlice.updateTask(data.task))
  }

  const handleDeleteClick = async () => {
    const url = `/tasks/${task._id}`
    const data = await api.delete(url)
    if (!data) return
    $store(tasksSlice.deleteTask(task._id))
  }

  const handleFocus = () => {
    toggleShow(true)
  }

  const handleBlur = () => {
    toggleShow(false)
  }

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

          <input
            disabled={api.loading}
            type="checkbox"
            className={css.checkBox}
            onChange={handleCheckClick}
            checked={task.completed}
            id={uniqueId}
          />

          <label htmlFor={uniqueId}>
            <FaCheck />
          </label>
        </div>

        <p className={css.middle}>{task.description?.slice(0, 100)}</p>

        <div className={css.bottom}>
          <div className={css.time}>
            <FaRegClock />
            <p>
              {taskStartingTime} {taskEndingTime && ' - ' + taskEndingTime}
            </p>
          </div>

          <div className={css.users}>
            {task.participants.map(({ user, active }) => {
              if (!active) return

              return (
                <img
                  key={user._id}
                  alt={user.name}
                  src={user.avatar ?? avatar}
                />
              )
            })}
          </div>
        </div>
      </div>

      <div className={css.context}>
        <Link
          to={`/tasks/${task._id}`}
          className="button"
          onFocus={handleFocus}
          onBlur={handleBlur}
        >
          <FaRegEdit />
        </Link>
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
