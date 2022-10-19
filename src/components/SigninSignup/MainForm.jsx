import { Link } from 'react-router-dom'
import css from './MainForm.module.scss'
import { SubmitBtn } from './FormUtils'

const MainForm = ({
  type,
  children,
  className,
  onSubmit = () => {},
  ...props
}) => {
  const handleSubmit = e => {
    e.preventDefault()
    onSubmit(e)
  }

  const loginMode = type === 'signin'
  const title = loginMode ? 'Log in' : 'Sign up'
  const linkLabel = !loginMode ? 'Log in' : 'Sign up'
  const linkUrl = loginMode ? '/signup' : '/signin'
  const statusLabel = loginMode ? "Don't" : 'Already'

  return (
    <form
      {...props}
      onSubmit={handleSubmit}
      className={`${className || ''} ${css.form}`}
    >
      <h4 className={css.form__title}>{title}</h4>

      {children}

      <SubmitBtn>{title}</SubmitBtn>

      <p className={css.statusLabel}>
        {statusLabel} have an account? <Link to={linkUrl}>{linkLabel}</Link>
      </p>
    </form>
  )
}

export default MainForm
