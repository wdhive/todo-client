import { useRef } from 'react'
import css from './Dropdown.module.scss'
import DownIcon from '$assets/icons/chev-down.svg?component'

const activeClassName = `.${css.Dropdown}[open]`
const removeActiveElements = (except) => {
  const activeElements = document.querySelectorAll(activeClassName)
  activeElements.forEach((el) => {
    if (el.isSameNode(except)) return
    el.removeAttribute('open')
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
  br = false,
  ...otherProps
}) => {
  const dropdownRef = useRef()

  const handleFormSubmit = (e) => e.preventDefault()
  const handleClick = () => {
    console.log('Click')

    removeActiveElements(dropdownRef.current)
    if (dropdownRef.current.hasAttribute('open')) {
      dropdownRef.current.removeAttribute('open')
    } else {
      dropdownRef.current.setAttribute('open', '')
    }
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
