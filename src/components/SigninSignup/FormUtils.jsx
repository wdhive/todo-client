import css from './FormUtils.module.scss'
import Loading from '$components/Loading'

export const SubmitBtn = ({ children, loading = false, error }) => {
  return (
    <div className={css.buttonContainer}>
      {error && <p className={css.error}>{error}</p>}

      <button className={css.button} disabled={loading}>
        {loading ? <Loading scoped={true} /> : children}
      </button>
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
