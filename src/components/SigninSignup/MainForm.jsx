import { Link } from 'react-router-dom'
import { useRef } from 'react'
import { getInputs } from '$utils/utils'

import css from './MainForm.module.scss'
import { SubmitBtn } from './FormUtils'

const MainForm = ({
  type,
  children,
  className,
  loading,
  error,
  onSubmit = () => {},
  ...props
}) => {
  const formRef = useRef()
  const handleSubmit = (e) => {
    e.preventDefault()
    if (loading) return
    onSubmit(...getInputs(formRef.current))
  }

  const loginMode = type === 'signin'
  const title = loginMode ? 'Log in' : 'Sign up'
  const linkLabel = !loginMode ? 'Log in' : 'Sign up'
  const linkUrl = loginMode ? '/signup' : '/signin'
  const statusLabel = loginMode ? "Don't" : 'Already'

  return (
    <form
      {...props}
      ref={formRef}
      onSubmit={handleSubmit}
      className={`${className || ''} ${css.form}`}
    >
      <h4 className={css.form__title}>{title}</h4>

      {children}

      <SubmitBtn loading={loading} error={error}>
        {title}
      </SubmitBtn>

      <p className={css.statusLabel}>
        {statusLabel} have an account? <Link to={linkUrl}>{linkLabel}</Link>
      </p>
    </form>
  )
}

export default MainForm
