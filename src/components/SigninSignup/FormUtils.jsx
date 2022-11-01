import css from './FormUtils.module.scss'
import Loading from '@com/Loading'

export const SubmitBtn = ({ children, loading = false, error }) => {
  console.log(error)

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

export const getInputs = (form) => {
  const inputs = [
    ...form.querySelectorAll('input[name]'),
    ...form.querySelectorAll('textarea[name]'),
  ]
  const values = {}
  const elements = {}

  inputs.forEach((input) => {
    const name = input.name
    if (!name) return

    let value = input.value
    if (input.type === 'file') value = input.files

    values[name] = value
    elements[name] = input
  })

  return [values, elements]
}
