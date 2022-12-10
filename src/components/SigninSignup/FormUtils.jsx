import css from './FormUtils.module.scss'
import Button from '$ui/Button'

export const SubmitBtn = ({ children, loading = false, error }) => {
  return (
    <div className={css.buttonContainer}>
      {error && <p className={css.error}>{error}</p>}

      <Button className={css.button} loading={loading}>
        {children}
      </Button>
    </div>
  )
}

export const Group = ({ label, children }) => {
  return (
    <div className={css.inputGroup}>
      {label ? (
        <div>
          <p>{label}</p>
          <div className={css.inputGroup__input}>{children}</div>
        </div>
      ) : (
        <div className={css.inputGroup__input}>{children}</div>
      )}
    </div>
  )
}
