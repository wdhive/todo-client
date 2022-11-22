import { useMemo, useState, memo } from 'react'
import useTaskCollections from '$hooks/useTaskCollections'
import css from './CollectionsDropdown.module.scss'
// import Dropdown from '$components/UI/Dropdown'
import Dropdown from '$components/Dropdown'
import Collections from './Collections'

const CollectionsDropdown = ({ collection: taskCollection = 'none' }) => {
  const availCollections = useTaskCollections()
  const cls = availCollections.map((col) => ({
    label: col.name,
    value: col._id,
  }))

  return <Dropdown list={cls} />

  const [selected, setSelected] = useState(taskCollection)

  const selectedItemElement = useMemo(() => {
    const match = availCollections.find(({ _id }) => _id === selected)
    if (!match && taskCollection !== 'none') return setSelected('none')

    return <Collections collection={match} />
  }, [availCollections, selected])

  return (
    <Dropdown
      title={selectedItemElement}
      form={false}
      align="right"
      className={css.collectionDropdown}
      buttonClassName={css.collectionDropdownButton}
      bodyClassName={css.collectionDropdownBody}
      br={true}
    >
      {availCollections.map((item) => (
        <Collections
          key={item._id}
          collection={item}
          selected={item._id === selected}
          setSelected={setSelected}
        />
      ))}
    </Dropdown>
  )
}

export default memo(CollectionsDropdown)
