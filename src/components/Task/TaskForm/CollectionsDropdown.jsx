import { memo } from 'react'
import useTaskCollections from '$hooks/useTaskCollections'
import css from './CollectionsDropdown.module.scss'
import Dropdown from '$components/UI/Dropdown'

const CollectionsDropdown = ({ collection = 'none' }) => {
  const taskCollections = useTaskCollections(
    (state) => state.settings.collections
  )

  const list = taskCollections.map((col) => ({
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
      default={collection}
      list={list}
      className={css.collectionDropdown}
      classNames={{
        button: css.collectionDropdownButton,
        section: css.collectionDropdownSection,
        ul: css.collectionDropdownBody,
        li: css.collectionDropdownLi,
      }}
      live
    />
  )
}

export default memo(CollectionsDropdown)
