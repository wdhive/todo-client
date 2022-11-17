import css from './index.module.scss'
import CloseIcon from '$assets/icons/cross.svg?component'
import FormBody from './FormBody'

const TaskForm = ({ task = {}, close }) => {
  const handleFormSubmit = (e) => {
    e.preventDefault()
    console.log(e.target.elements)
  }

  return (
    <div className={css.TaskForm}>
      <div className={css.header}>
        <div className="wrapper">
          <h6>{task.title ?? 'Create Task'}</h6>
          <button onClick={close}>
            <CloseIcon />
          </button>
        </div>
      </div>

      <form className={cn('scroll-inside-flex', css.body)} onSubmit={handleFormSubmit}>
        <div className="wrapper">
          <FormBody />
        </div>
      </form>
    </div>
  )
}

export default TaskForm
