import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useApi } from '$api/react'
import settings from '$slice/Settings'
import { HiPlus, HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi'

import css from './Collection.module.scss'
import CollectionForm from './CollectionForm'
import Button from '$ui/Button'
import Modal from '$ui/Uncontrolled/Modal'

const Collection = () => {
  const api = useApi()
  const [activeCollection, setActiveCollection] = useState(false)
  const collections = useSelector((state) => state.settings.collections)

  const handleDelete = async (id) => {
    const modal = await Modal({
      description: 'Selected collection will be deleted',
    })
    if (!modal.result) return modal.close()

    const data = await api.delete('/user/collections/' + id)
    modal.close()
    if (!data) return
    setActiveCollection(false)
    $store(settings.deleteCollection(id))
  }

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
                <button
                  disabled={api.loading}
                  onClick={() => setActiveCollection(collection)}
                >
                  <HiOutlinePencil />
                </button>
                <button
                  disabled={api.loading}
                  onClick={() => handleDelete(collection._id)}
                >
                  <HiOutlineTrash />
                </button>
              </div>
            </div>
          )
        })}
      </ul>

      {activeCollection && (
        <CollectionForm
          collection={activeCollection}
          setActiveCollection={setActiveCollection}
          api={api}
        />
      )}

      <Button
        loading={api.loading}
        className={cn('button__tertiary', css.addBtn)}
        onClick={() => {
          setActiveCollection(
            activeCollection ? (activeCollection._id ? {} : false) : {}
          )
        }}
      >
        Add Category <HiPlus />
      </Button>
    </div>
  )
}

export default Collection
