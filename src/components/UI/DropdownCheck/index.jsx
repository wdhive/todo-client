import { useState } from 'react'
import { RiCheckLine } from 'react-icons/ri'
import useEffectExceptOnMount from 'use-effect-except-on-mount'

import Dropdown from '$ui/Dropdown'
import css from './index.module.scss'

const DropdownCheck = ({
  list,
  onChange,
  classNames: { li: liClassName, ...classNames } = {},
  ...props
}) => {
  const [listState, setListState] = useState(() => list)

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

        onChange && onChange(next)
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
        <div className={css.checkbox}>
          <RiCheckLine />
        </div>
        <div>{label}</div>
      </div>
    )

    return {
      value,
      label: labelContainer,
    }
  })

  useEffectExceptOnMount(() => setListState(list), [list])

  return (
    <div className={css.DropdownCheck}>
      <Dropdown
        {...props}
        live={false}
        autoClose={false}
        list={newList}
        classNames={classNames}
        disableKeyboardNavigation
      />
    </div>
  )
}

export default DropdownCheck
