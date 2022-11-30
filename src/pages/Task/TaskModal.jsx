import { useRef, useEffect, memo } from 'react'
import { useNavigate } from 'react-router-dom'
import css from './TaskModal.module.scss'
import TaskForm from '$components/Task/TaskForm'

const TaskModal = ({ ...props }) => {
  const dialogRef = useRef()
  const navigate = useNavigate()

  useEffect(() => {
    const element = dialogRef.current
    element.close()
    element.showModal()
    return () => element.close()
  }, [])

  const handleClose = () => {
    dialogRef.current.classList.add(css.close)
    setTimeout(() => {
      navigate('..')
    }, 200)
  }

  const handleCancel = (e) => {
    e.preventDefault()
    handleClose()
  }

  return (
    <dialog className={css.TaskNew} ref={dialogRef} onCancel={handleCancel}>
      <div className={css.backdrop} onClick={handleClose} />
      <div className={css.content}>
        <TaskForm {...props} close={handleClose} />
      </div>
    </dialog>
  )
}

export default memo(TaskModal)
