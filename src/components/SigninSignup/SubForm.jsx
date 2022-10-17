import css from './SubForm.module.scss'
import { SubmitBtn } from './FormUtils'
import { Link } from 'react-router-dom'

const MainForm = ({
  children,
  className,
  statusText,
  buttonLabel = 'Submit',
  onSubmit = () => {},
  ...props
}) => {
  const handleSubmit = e => {
    e.preventDefault()
    onSubmit(e)
  }

  return (
    <form
      {...props}
      onSubmit={handleSubmit}
      className={`${className || ''} ${css.form}`}
    >
      <div className={css.form__header}>
        <button>Hell</button>
        <button>Go Back</button>
      </div>

      {children}

      <SubmitBtn>{buttonLabel}</SubmitBtn>
      {statusText && <p className={css.statusText}>{statusText}</p>}
    </form>
  )
}

export default MainForm
