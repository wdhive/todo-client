import css from './Button.module.scss'
import Loading from '$components/Loading'

const Button = ({
  blank,
  manualDisable,
  className,
  children,
  loading = false,
  ...props
}) => {
  props.disabled ??= loading

  return (
    <button {...props} className={cn(blank || 'button', css.Button, className)}>
      {loading ? (
        <div className={css.loading}>
          <Loading scoped />
        </div>
      ) : (
        children
      )}
    </button>
  )
}

export default Button
