import css from './Checkbox.module.scss'
import { RiCheckLine } from 'react-icons/ri'
import Loading from '$components/Loading'

const Checkbox = ({ className, checked, disabled, loading, ...props }) => {
  return (
    <button
      {...props}
      className={cn(
        css.checkbox,
        checked && css.checked,
        disabled && css.disabled,
        className
      )}
    >
      {loading ? (
        <div className={css.loading}>
          <Loading scoped />
        </div>
      ) : (
        <RiCheckLine />
      )}
    </button>
  )
}

export default Checkbox
