import { memo, useId } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import css from './TaskCard.module.scss'
import EditIcon from '$assets/icons/edit.svg?component'
import DeleteIcon from '$assets/icons/delete.svg?component'
import ClockIcon from '$assets/icons/clock.svg?component'
import CheckIcon from '$assets/icons/check.svg?component'
import avatar from '$assets/avatar.png'
import uiSlice from '$slice/ui'
import useApi from '$src/api/useApi'
import tasksSlice from '$src/store/slice/tasks'

const TaskCard = ({ task }) => {
  const uniqueId = useId()
  const show = useSelector((state) => state.ui.globalActive === uniqueId)
  const api = useApi()

  const taskStartingTime = new Date(task.startingDate).toDateString()
  const taskEndingTime =
    task.endingDate && new Date(task.endingDate).toDateString()

  const handleContextMenu = (e) => {
    e.stopPropagation()
    e.preventDefault()
    $store(uiSlice.setGlobalActive(show || uniqueId))
  }

  const handleCheckClick = async () => {
    const url = `/tasks/${task._id}/${
      task.completed ? 'uncomplete' : 'complete'
    }`

    const data = await api.patch(url)
    if (!data) return

    $store(tasksSlice.updateTask(data.task))
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
          <h6>{task.title}</h6>
          <input
            disabled={api.loading}
            type="checkbox"
            className={css.checkBox}
            onChange={handleCheckClick}
            checked={task.completed}
          />

          <div
            onClick={({ currentTarget }) =>
              currentTarget.previousElementSibling.click()
            }
          >
            <CheckIcon />
          </div>
        </div>

        <p className={css.middle}>{task.description?.slice(0, 100)}</p>

        <div className={css.bottom}>
          <div className={css.time}>
            <ClockIcon />
            <p>
              {taskStartingTime} {taskEndingTime && ' - ' + taskEndingTime}
            </p>
          </div>

          <div className={css.users}>
            {task.participants.map(({ avatar: imgUrl, _id, name }) => {
              return <img key={_id} src={imgUrl ?? avatar} alt={name} />
            })}
          </div>
        </div>
      </div>

      <div className={css.context}>
        <Link to={`/tasks/${task._id}`}>
          <EditIcon />
        </Link>
        <Link>
          <DeleteIcon />
        </Link>
      </div>
    </div>
  )
}

export default memo(TaskCard)
