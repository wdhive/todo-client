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

const TaskCard = ({ task }) => {
  const uniqueId = useId()
  const show = useSelector((state) => state.ui.globalActive === uniqueId)

  const taskStartingTime = new Date(task.startingDate).toDateString()
  const taskEndingTime =
    task.endingDate && new Date(task.endingDate).toDateString()

  const handleContextMenu = (e) => {
    e.stopPropagation()
    e.preventDefault()
    $store(uiSlice.setGlobalActive(show || uniqueId))
  }

  return (
    <div
      className={cn(css.Task, show && css.contextActive)}
      onContextMenu={handleContextMenu}
    >
      <div className={css.main}>
        <div className={css.top}>
          <h6>{task.title}</h6>
          <input
            type="checkbox"
            className={css.checkBox}
            defaultChecked={task.completed}
          />

          <div
            onClick={({ currentTarget }) =>
              currentTarget.previousElementSibling.click()
            }
          >
            <CheckIcon />
          </div>
        </div>

        <p>{task.description}</p>

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
