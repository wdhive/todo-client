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
        <p>Go Back</p>
      </div>

      {children}

      <SubmitBtn>{buttonLabel}</SubmitBtn>
      {statusText && <p className={css.statusText}>{statusText}</p>}
    </form>
  )
}

export default MainForm
