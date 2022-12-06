import { useState } from 'react'
import { useSelector } from 'react-redux'
import { HiPlus, HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi'
import useApi from '$api/useApi'
import css from './Collection.module.scss'
import CollectionForm from './CollectionForm'

const Collection = () => {
  const api = useApi()
  const [activeCollection, setActiveCollection] = useState(false)
  const collections = useSelector((state) => state.settings.collections)

  return (
    <div className={css.Collection}>
      <ul className={css.list}>
        {collections.map((collection) => {
          return (
            <div
              key={collection._id}
              className={css.listItem}
              style={{
                color: `hsl(${collection.hue}, 50%, 50%)`,
              }}
            >
              <div className={css.details}>
                <div />
                <p> {collection.name}</p>
              </div>

              <div className={css.buttons}>
                <button onClick={() => setActiveCollection(collection)}>
                  <HiOutlinePencil />
                </button>
                <button>
                  <HiOutlineTrash />
                </button>
              </div>
            </div>
          )
        })}
      </ul>

      {activeCollection && <CollectionForm collection={activeCollection} />}

      <button
        className={cn('button button__tertiary', css.addBtn)}
        onClick={() => {
          setActiveCollection(
            activeCollection ? (activeCollection._id ? {} : false) : {}
          )
        }}
      >
        Add Category <HiPlus />
      </button>
    </div>
  )
}

export default Collection
