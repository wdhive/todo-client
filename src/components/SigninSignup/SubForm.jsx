import css from './SubForm.module.scss'
import { SubmitBtn, getInputs } from './FormUtils'
import BackIcon from '@ass/icons/back.svg?component'
import { useRef } from 'react'

const MainForm = ({
  children,
  className,
  statusText,
  buttonLabel = 'Submit',
  onBack = () => {},
  onSubmit = () => {},
  ...props
}) => {
  const formRef = useRef()
  const handleSubmit = e => {
    e.preventDefault()
    onSubmit(...getInputs(formRef.current))
  }

  return (
    <form
      {...props}
      ref={formRef}
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
