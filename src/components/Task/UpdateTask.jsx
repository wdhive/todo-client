import css from './UpdateTask.module.scss'
import CloseIcon from '$assets/icons/cross.svg?component'
import TaskForm from './TaskForm'

const UpdateTask = ({ task = {}, close }) => {
  const handleFormSubmit = (e) => {
    e.preventDefault()
    console.log(e.target.elements)
  }

  return (
    <div className={css.UpdateTask}>
      <div className={css.header}>
        <div className="wrapper">
          <h6>{task.title ?? 'Create Task'}</h6>
          <button onClick={close}>
            <CloseIcon />
          </button>
        </div>
      </div>

      <form className={css.body} onSubmit={handleFormSubmit}>
        <div className="wrapper">
          <TaskForm />
        </div>
      </form>
    </div>
  )
}

export default UpdateTask
