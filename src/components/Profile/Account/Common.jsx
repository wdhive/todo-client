import css from './Common.module.scss'

export const FormGroup = ({ children, label }) => {
  return (
    <div className={css.group}>
      {label && <p className={css.groupLabel}>{label}</p>}

      <div className={css.groupContent}>{children}</div>
    </div>
  )
}
