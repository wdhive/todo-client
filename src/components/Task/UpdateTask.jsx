import css from './UpdateTask.module.scss'
import CloseIcon from '$assets/icons/cross.svg?component'

const UpdateTask = ({ task = {}, close }) => {
  return (
    <>
      <div className={css.header}>
        <div className="wrapper">
          <h6>{task.title ?? 'Create Task'}</h6>
          <button onClick={close}>
            <CloseIcon />
          </button>
        </div>
      </div>

      <form className={css.body}>
        <div className="wrapper"></div>
      </form>
    </>
  )
}

export default UpdateTask
