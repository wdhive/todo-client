import { useEffect, useMemo, useRef, useState } from 'react'
import css from './index.module.scss'
import useGetItem from './useGetItem'
import { BsChevronDown } from 'react-icons/bs'
import useActiveState, { stopPropagation } from 'use-active-state'
import { focusTo } from './utils'
import useEffectExceptOnMount from 'use-effect-except-on-mount'

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

  const handleSelectChange = async (value) => {
    if (selectedValue === value) return
    let defaultPrevented = false

    const rv = onChange(value, () => (defaultPrevented = true))
    if (rv instanceof Promise) await rv

    if (!defaultPrevented) {
      setSelectedValue(value)
    }
  }

  const handleButtnKeyDown = (e) => {
    if (!isOpen) return

    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault()
        handleSelectChange(getItem(-1).value)
        break

      case 'ArrowDown':
        e.preventDefault()
        handleSelectChange(getItem(1).value)
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
          handleSelectChange(item.value)
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

  useEffectExceptOnMount

  useEffectExceptOnMount(() => {
    if (!defaultValue) return
    setSelectedValue(defaultValue)
  }, [defaultValue])

  useEffect(() => {
    if (!selectedItemRef.current) return
    focusTo(containerRef.current, selectedItemRef.current)
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
        onClick={() => toggleIsOpen()}
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
