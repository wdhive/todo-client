import css from './FormUtils.module.scss'

export const SubmitBtn = ({ children }) => {
  return <button className={css.button}>{children}</button>
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
