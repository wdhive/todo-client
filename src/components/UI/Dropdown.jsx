import { useRef } from 'react'
import css from './Dropdown.module.scss'
import DownIcon from '$assets/icons/chev-down.svg?component'

const activeClassName = `.${css.Dropdown}[dropdown-open]`
const removeActiveElements = (except) => {
  const activeElements = document.querySelectorAll(activeClassName)
  activeElements.forEach((el) => {
    if (el.isSameNode(except)) return
    el.removeAttribute('dropdown-open')
  })
}
document.addEventListener('click', (e) => {
  const closest = e.target.closest(activeClassName)
  if (closest) return
  removeActiveElements()
})
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') return
  removeActiveElements()
})

const Dropdown = ({
  title,
  children,
  align = 'left',
  className,
  bodyClassName,
  buttonClassName,
  form = true,
  ...otherProps
}) => {
  const dropdownRef = useRef()

  const handleFormSubmit = (e) => e.preventDefault()
  const handleClick = () => {
    removeActiveElements(dropdownRef.current)
    if (dropdownRef.current.hasAttribute('dropdown-open')) {
      dropdownRef.current.removeAttribute('dropdown-open')
    } else {
      dropdownRef.current.setAttribute('dropdown-open', '')
    }
  }

  const content = (
    <>
      <button
        type="button"
        className={cn(css.label, buttonClassName)}
        onClick={handleClick}
      >
        <div>{title}</div>
        <DownIcon />
      </button>

      <div
        className={cn(
          css.body,
          align === 'left' && css.alignLeft,
          align === 'right' && css.alignRight,
          bodyClassName
        )}
      >
        {children}
      </div>
    </>
  )

  const props = {
    ...otherProps,
    ref: dropdownRef,
    className: cn(css.Dropdown, className),
  }

  if (form)
    return (
      <form {...props} onSubmit={handleFormSubmit}>
        {content}
      </form>
    )

  return <div {...props}>{content}</div>
}

export default Dropdown
