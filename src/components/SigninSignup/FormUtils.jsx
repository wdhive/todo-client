import css from './FormUtils.module.scss'

export const SubmitBtn = ({ children }) => {
  return <button className={css.button}>{children}</button>
}

export const InputGroup = ({ label, children }) => {
  return (
    <div className={css.inputGroup}>
      {label ? (
        <div>
          <p>{label}</p>
          {children}
        </div>
      ) : (
        children
      )}
    </div>
  )
}
