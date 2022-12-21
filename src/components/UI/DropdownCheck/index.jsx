import { useRef, useState } from 'react'
import useEffectExceptOnMount from 'use-effect-except-on-mount'
import { BsChevronDown } from 'react-icons/bs'

import Dropdown from '$ui/Dropdown'
import css from './index.module.scss'
import Checkbox from '$ui/Checkbox'

const DropdownCheck = ({
  title,
  expand = true,
  useFloat = true,
  list,
  onChange,
  className,
  classNames: { li: liClassName, ...classNames } = {},
  ...props
}) => {
  const sectionRef = useRef()
  const dropdownListRef = useRef()
  const [expandMenu, setExpandMenu] = useState(() => expand)
  const [listState, setListState] = useState(() => list)

  useEffectExceptOnMount(() => setListState(list), [list])

  const newList = listState.map(({ label, value, selected }) => {
    const handleClick = (e) => {
      e.stopPropagation()

      setListState((prev) => {
        const next = [...prev].map((item) => {
          if (item.value === value) {
            item.selected = !selected
          }
          return item
        })

        onChange &&
          onChange(
            Object.fromEntries(
              next.filter((i) => i.selected).map((i) => [i.value, true])
            )
          )

        return next
      })
    }

    const handleKeyDown = (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault()
        e.currentTarget.click()
      }
    }

    const labelContainer = (
      <div
        tabIndex="0"
        active={selected ? '' : undefined}
        className={cn(css.labelContainer, liClassName)}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
      >
        <Checkbox selected={selected} />
        <div>{label}</div>
      </div>
    )

    return {
      value,
      label: labelContainer,
    }
  })

  if (useFloat)
    return (
      <Dropdown
        {...props}
        live={false}
        list={newList}
        className={className}
        classNames={classNames}
        disableKeyboardNavigation
      />
    )

  return (
    <div
      className={cn(css.Dropdown, className)}
      list-expand={expandMenu ? '' : undefined}
    >
      <button
        className={cn(css.header, classNames.button)}
        onClick={() => {
          sectionRef.current.style.height = `${dropdownListRef.current.clientHeight}px`

          clearTimeout(sectionRef.current.timeout)
          sectionRef.current.timeout = setTimeout(() => {
            sectionRef.current.removeAttribute('style')
          }, 300)

          setTimeout(() => {
            setExpandMenu((prev) => !prev)
          }, 50)
        }}
      >
        {title} <BsChevronDown className={cn(css.arrow, classNames.svg)} />
      </button>

      <section className={cn(css.section, classNames.section)} ref={sectionRef}>
        <ul className={cn(css.list, classNames.ul)} ref={dropdownListRef}>
          {newList.map(({ label, value }) => (
            <li key={value}>{label}</li>
          ))}
        </ul>
      </section>
    </div>
  )
}

export default DropdownCheck
