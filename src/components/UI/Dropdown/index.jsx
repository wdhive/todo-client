import { useEffect, useMemo, useRef, useState } from 'react'
import css from './index.module.scss'
import useGetItem from './useGetItem'
import { BsChevronDown } from 'react-icons/bs'
import useActiveState, { stopPropagation } from 'use-active-state'
import { focusTo } from './utils'

const index = ({
  name,
  className,
  classNames = {},
  list,
  default: defaultValue,
  buttonLabel = 'Choose...',
  icon = true,
  live = true,
  onChange = () => {},
}) => {
  const containerRef = useRef()
  const selectedItemRef = useRef()

  const [isOpen, toggleIsOpen] = useActiveState()
  const [selectedValue, setSelectedValue] = useState(defaultValue)

  const handleButtonClick = () => toggleIsOpen()

  const handleButtnKeyDown = (e) => {
    if (!isOpen) return

    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault()
        setSelectedValue(getItem(-1).value)
        break
      case 'ArrowDown':
        e.preventDefault()
        setSelectedValue(getItem(1).value)
        break
    }
  }

  const listItems = useMemo(
    () =>
      list.map((item) => {
        const isSelected = item.value === selectedValue
        const props = {}
        if (isSelected) props.ref = selectedItemRef

        const handleItemClick = () => {
          setSelectedValue(item.value)
          toggleIsOpen(false)
        }

        return (
          <li
            {...props}
            key={item.value}
            value={item.value}
            active={isSelected ? '' : undefined}
            className={cn(css.li, classNames.li)}
            onClick={handleItemClick}
          >
            {item.label}
          </li>
        )
      }),
    [list, selectedValue]
  )

  const getItem = useGetItem(list, selectedValue)
  const currentItem = useMemo(() => getItem(), [selectedValue])

  useEffect(() => {
    if (!selectedItemRef.current) return
    focusTo(containerRef.current, selectedItemRef.current)
  }, [selectedItemRef.current])

  useEffect(() => {
    onChange(selectedValue, currentItem)
  }, [selectedValue])

  return (
    <div
      className={cn(css.Dropdown, className)}
      active={isOpen ? '' : undefined}
      onClick={stopPropagation}
      data-value={selectedValue}
    >
      {name && (
        <input
          type="radio"
          name={name}
          onChange={() => {}}
          defaultChecked
          value={selectedValue}
          style={{ display: 'none !important' }}
          hidden
        />
      )}

      <button
        className={cn(css.button, classNames.button)}
        type="button"
        onClick={handleButtonClick}
        onKeyDown={handleButtnKeyDown}
      >
        {(live && currentItem?.label) || buttonLabel}

        {icon && <BsChevronDown className={cn(css.svg, classNames.svg)} />}
      </button>

      <section className={cn(css.section, classNames.section)}>
        <ul ref={containerRef} className={cn(css.ul, classNames.ul)}>
          {listItems}
        </ul>
      </section>
    </div>
  )
}

export default index
