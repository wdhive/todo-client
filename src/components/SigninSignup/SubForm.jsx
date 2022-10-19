import css from './SubForm.module.scss'
import { SubmitBtn } from './FormUtils'
import BackIcon from '@ass/icons/back.svg?component'

const MainForm = ({
  children,
  className,
  statusText,
  buttonLabel = 'Submit',
  onBack = () => {},
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
        <button type="button" onClick={onBack}>
          <BackIcon />
        </button>
        <h6>Go Back</h6>
      </div>

      {children}

      <SubmitBtn>{buttonLabel}</SubmitBtn>
      {statusText && <p className={css.statusText}>{statusText}</p>}
    </form>
  )
}

export default MainForm
