import css from './SubForm.module.scss'
import { SubmitBtn, getInputs } from './FormUtils'
import BackIcon from '$assets/icons/back.svg?component'
import { useRef } from 'react'

const MainForm = ({
  children,
  className,
  statusText,
  buttonLabel = 'Submit',
  loading,
  error,
  onBack = () => {},
  onSubmit = () => {},
  ...props
}) => {
  const formRef = useRef()
  const handleSubmit = (e) => {
    e.preventDefault()
    if (loading) return
    onSubmit(...getInputs(formRef.current))
  }

  return (
    <form
      {...props}
      ref={formRef}
      onSubmit={handleSubmit}
      className={cn(css.form, className)}
    >
      <div className={css.form__header}>
        <button type="button" onClick={onBack}>
          <BackIcon />
        </button>
        <h6>Go Back</h6>
      </div>

      {children}

      <SubmitBtn loading={loading} error={error}>
        {buttonLabel}
      </SubmitBtn>
      {statusText && <p className={css.statusText}>{statusText}</p>}
    </form>
  )
}

export default MainForm
