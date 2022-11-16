import { useRef, useState } from 'react'
import css from './Dropdown.module.scss'
import DownIcon from '$assets/icons/chev-down.svg?component'

const activeClassName = `.${css.Dropdown}.${css.isOpen}`
const removeActiveElements = (except) => {
  const activeElements = document.querySelectorAll(activeClassName)
  activeElements.forEach((el) => {
    if (el.isSameNode(except)) return
    el.classList.remove(css.isOpen)
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
  ...otherProps
}) => {
  const dropdownRef = useRef()
  const [randomId] = useState(() => {
    const id = Math.random() + Math.random() + Math.random() + Math.random()
    return id.toString()
  })

  const handleFormSubmit = (e) => e.preventDefault()
  const handleClick = () => {
    removeActiveElements(dropdownRef.current)
    dropdownRef.current.classList.toggle(css.isOpen)
  }

  return (
    <form
      {...otherProps}
      ref={dropdownRef}
      onSubmit={handleFormSubmit}
      drop-down-unique-id={randomId}
      className={css.Dropdown}
    >
      <button className={css.label} onClick={handleClick}>
        <p>{title}</p>
        <DownIcon />
      </button>

      <div
        className={cn(
          css.body,
          align === 'left' && css.alignLeft,
          align === 'right' && css.alignRight,
          className
        )}
      >
        {children}
      </div>
    </form>
  )
}

export default Dropdown
