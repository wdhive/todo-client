import { memo, useMemo } from 'react'
import useTaskCollections from '$hooks/useTaskCollections'
import css from './CollectionsDropdown.module.scss'
import Dropdown from '$ui/Dropdown'

const CollectionsDropdown = ({ collection = 'none' }) => {
  const taskCollections = useTaskCollections(
    (state) => state.settings.collections
  )

  const matchedCollection = useMemo(() => {
    const matched = taskCollections.find((col) => col._id === collection)
    return matched?._id ?? 'none'
  }, [taskCollections, collection])

  const dropDownOptions = taskCollections.map((col) => ({
    label: (
      <div className={css.label}>
        <div
          className={css.color}
          style={{
            background: col.hue && `hsl(${col.hue}, 50%, 50%)`,
          }}
        />
        <div className={css.name}>{col.name}</div>
      </div>
    ),
    value: col._id,
  }))

  return (
    <Dropdown
      name="collection"
      default={matchedCollection}
      list={dropDownOptions}
      className={css.dropdown}
      classNames={{
        button: css.button,
        section: css.section,
        ul: css.ul,
        li: css.li,
        svg: css.svg,
      }}
      live
    />
  )
}

export default memo(CollectionsDropdown)
