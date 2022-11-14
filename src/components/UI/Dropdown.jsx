import { useEffect, useState } from 'react'
import css from './Dropdown.module.scss'
import DownIcon from '@ass/icons/chev-down.svg?component'

const Dropdown = ({
  title,
  children,
  align = 'left',
  className,
  ...otherProps
}) => {
  const [randomId] = useState(() => {
    const id = Math.random() + Math.random() + Math.random() + Math.random()
    return id.toString()
  })

  const handleFormSubmit = (e) => e.preventDefault()
  const handleClick = () => setIsOpen((prev) => !prev)

  useEffect(() => {
    const handleClick = ({ target }) => {
      const closest = target.closest(`[drop-down-unique-id="${randomId}"]`)
      if (!closest) setIsOpen(false)
    }

    const handleVisibility = () => {
      document.hidden && setIsOpen(false)
    }

    document.addEventListener('click', handleClick)
    document.addEventListener('visibilitychange', handleVisibility)
    return () => {
      document.removeEventListener('click', handleClick)
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [])

  const [isOpen, setIsOpen] = useState(false)

  return (
    <form
      {...otherProps}
      onSubmit={handleFormSubmit}
      drop-down-unique-id={randomId}
      className={cn(css.Dropdown, isOpen && css.isOpen)}
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
