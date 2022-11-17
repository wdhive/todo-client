import { useState } from 'react'
import css from './CollectionsDropdown.module.scss'
import Dropdown from '$src/components/UI/Dropdown'
import Collections from './Collections'

const CollectionsDropdown = () => {
  const [selectedItem, setSelectedItem] = useState(0)
  const collections = [
    {
      name: 'None',
    },
    {
      name: 'Test 0',
      hue: 20,
    },
    {
      name: 'Test 1',
      hue: 110,
    },
    {
      name: 'Test 2',
      hue: 170,
    },
    {
      name: 'Test 3',
      hue: 150,
    },
  ]

  const selectedItemElement = (
    <Collections index={selectedItem} collection={collections[selectedItem]} />
  )

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
      {collections.map((collection, index) => (
        <Collections
          key={index}
          index={index}
          collection={collection}
          selectInput={setSelectedItem}
        />
      ))}
    </Dropdown>
  )
}

export default CollectionsDropdown
