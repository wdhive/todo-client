import { useEffect, useMemo, useRef, useState } from 'react'
import css from './index.module.scss'
import useGetItem from './useGetItem'
import DownIcon from '$assets/icons/chev-down.svg?component'

const focusTo = function (container, element) {
  const eleTop = element.offsetTop
  const eleBottom = eleTop + element.clientHeight

  const containerTop = container.scrollTop
  const containerBottom = containerTop + container.clientHeight

  if (eleTop < containerTop) {
    element.scrollIntoView(true)
  } else if (eleBottom > containerBottom) {
    element.scrollIntoView(false)
  }
}

const index = ({
  name,
  className,
  classNames = {},
  list,
  default: defaultValue,
  buttonLabel = 'Choose...',
  icon = true,
  live = true,
  none = false,
  onChange = () => {},
}) => {
  const finalList = useMemo(() => {
    const newList = [...(list ?? [])]
    if (none) {
      newList.unshift({
        label: 'none',
        value: 'none',
      })
    }
    return newList
  }, [list])

  const containerRef = useRef()
  const selectedItemRef = useRef()
  const [isOpen, setIsOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState(defaultValue)
  const getItem = useGetItem(finalList, selectedValue)

  const handleButtonClick = () => {
    setIsOpen((prev) => !prev)
  }
  const handleButtonBlur = () => {
    setTimeout(() => {
      setIsOpen(false)
    }, 175)
  }
  const handleButtnKeyDown = (e) => {
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

  const currentItem = useMemo(() => getItem(), [selectedValue])
  const listItems = useMemo(() => {
    return finalList.map((item) => {
      const isSelected = item.value === selectedValue

      const props = {}
      if (isSelected) props.ref = selectedItemRef

      return (
        <li
          {...props}
          key={item.value}
          value={item.value}
          active={isSelected ? '' : undefined}
          className={cn(css.li, classNames.li)}
          onClick={(e) => {
            setSelectedValue(item.value)
            setIsOpen(false)
          }}
        >
          {item.label}
        </li>
      )
    })
  }, [finalList, selectedValue])

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
        onBlur={handleButtonBlur}
        onClick={handleButtonClick}
        onKeyDown={handleButtnKeyDown}
      >
        {(live && currentItem?.label) || buttonLabel}

        {icon && <DownIcon className={cn(css.svg, classNames.svg)} />}
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
