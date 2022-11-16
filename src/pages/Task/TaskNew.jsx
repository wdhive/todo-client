import { useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import css from './TaskNew.module.scss'
import UpdateTask from '$components/Task/UpdateTask'

const TaskNew = ({ ...props }) => {
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
    }, 150)
  }

  return (
    <dialog className={css.TaskNew} ref={dialogRef}>
      <div className={css.backdrop} onClick={handleClose} />
      <div className={css.content}>
        <UpdateTask {...props} close={handleClose} />
      </div>
    </dialog>
  )
}

export default TaskNew
