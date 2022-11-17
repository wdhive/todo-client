import { useMemo, useState, memo } from 'react'
import useTaskCollections from '$hooks/useTaskCollections'
import css from './CollectionsDropdown.module.scss'
import Dropdown from '$src/components/UI/Dropdown'
import Collections from './Collections'

const CollectionsDropdown = ({ collection = 'none' }) => {
  const [selectedItem, setSelectedItem] = useState(collection)
  const collections = useTaskCollections()

  const selectedItemElement = useMemo(() => {
    const match = collections.find(({ _id }) => _id === selectedItem)
    if (!match && collection !== 'none') return setSelectedItem('none')

    return <Collections collection={match} />
  }, [collections, selectedItem])

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
      {collections.map((collection) => (
        <Collections
          key={collection._id}
          collection={collection}
          selectInput={setSelectedItem}
        />
      ))}
    </Dropdown>
  )
}

export default memo(CollectionsDropdown)
