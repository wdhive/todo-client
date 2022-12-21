import { useEffect, useId, useMemo, useRef, useState } from 'react'
import useActiveState from 'use-active-state'
import useEffectExceptOnMount from 'use-effect-except-on-mount'
import { BsChevronDown } from 'react-icons/bs'
import useGetItem from './useGetItem'

import css from './index.module.scss'

const index = ({
  name,
  className,
  classNames = {},
  list,
  default: defaultValue,
  label: buttonLabel = 'Choose...',
  icon = true,
  live = true,
  disableKeyboardNavigation,
  onChange = () => {},
}) => {
  const containerRef = useRef()
  const buttonRef = useRef()
  const selectedItemRef = useRef()
  const uniqueId = '@Dropdown' + useId()
  let selector = `.${css.Dropdown}[data-id="${uniqueId}"]`

  const [isOpen, toggleIsOpen, contentRef] = useActiveState()
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

        const handleKeyDown = (e) => {
          if (disableKeyboardNavigation) return

          if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault()
            e.currentTarget.click()
          }
        }

        return (
          <li
            tabIndex={disableKeyboardNavigation ? '-1' : '0'}
            {...props}
            key={item.value}
            value={item.value}
            active={isSelected ? '' : undefined}
            className={cn(css.li, classNames.li)}
            onClick={handleItemClick}
            onKeyDown={handleKeyDown}
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
    if (disableKeyboardNavigation) return
    if (isOpen) selectedItemRef?.current?.focus()
  }, [isOpen, disableKeyboardNavigation])

  useEffectExceptOnMount(() => {
    if (isOpen) return
    const closest = document.activeElement?.closest(selector)
    closest && buttonRef?.current?.focus()
  }, [isOpen])

  useEffectExceptOnMount(() => {
    if (!defaultValue) return
    setSelectedValue(defaultValue)
  }, [defaultValue])

  return (
    <div
      data-id={uniqueId}
      className={cn(css.Dropdown, className)}
      active={isOpen ? '' : undefined}
      data-value={selectedValue}
      ref={contentRef}
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
        ref={buttonRef}
        className={cn(css.button, classNames.button)}
        type="button"
        onClick={() => toggleIsOpen()}
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
