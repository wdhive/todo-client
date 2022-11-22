import { memo, useId } from 'react'
import { useSelector } from 'react-redux'
import css from './DropdownOld.module.scss'
import DownIcon from '$assets/icons/chev-down.svg?component'
import uiSlice from '$slice/ui'

const Dropdown = ({
  title,
  children,
  align = 'left',
  className,
  bodyClassName,
  buttonClassName,
  form = true,
  br = false,
  ...otherProps
}) => {
  const uniqueId = useId()
  const open = useSelector((state) => {
    return state.ui.globalActive === uniqueId
  })

  const handleFormSubmit = (e) => e.preventDefault()
  const handleClick = (e) => {
    e.stopPropagation()
    $store(uiSlice.setGlobalActive(open || uniqueId))
  }

  const content = (
    <>
      <button
        type="button"
        className={cn(css.button, buttonClassName)}
        onClick={handleClick}
      >
        <div>{title}</div>
        <DownIcon />
      </button>

      <div
        className={cn(
          css.body,
          align === 'left' && css.alignLeft,
          align === 'right' && css.alignRight
        )}
      >
        <div className={cn(css.content, bodyClassName)}>{children}</div>

        {br && <br />}
      </div>
    </>
  )

  const props = {
    ...otherProps,
    className: cn(css.Dropdown, className),
    open,
  }

  if (form)
    return (
      <form {...props} onSubmit={handleFormSubmit}>
        {content}
      </form>
    )

  return <div {...props}>{content}</div>
}

export default memo(Dropdown)
