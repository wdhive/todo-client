import { RiCheckLine } from 'react-icons/ri'
import { useEffect, useId, useState } from 'react'
import settingsSlice from '$slice/Settings'

import css from './CollectionForm.module.scss'
import HueRange from './HueRange'
import Button from '$ui/Button'

const CollectionForm = ({ collection, setActiveCollection, api }) => {
  const [hue, setHue] = useState(220)
  const [name, setName] = useState('')

  useEffect(() => {
    setHue(collection.hue ?? 220)
  }, [collection.hue])
  useEffect(() => {
    setName(collection.name ?? '')
  }, [collection.name])

  const nameId = useId()
  const hueId = useId()

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    if (hue === collection.hue && name === collection.name) return
    let data = false
    const body = { name, hue }

    if (collection._id) {
      data = await api.patch('/user/collections/' + collection._id, body)
      $store(settingsSlice.updateCollection(data.collection))
    } else {
      data = await api.post('/user/collections', body)
      $store(settingsSlice.addCollection(data.collection))
    }

    setActiveCollection(data.collection)
  }

  return (
    <form onSubmit={handleFormSubmit} className={css.CollectionForm}>
      <label htmlFor={nameId}>Name</label>
      <div className={css.group}>
        <input
          type="text"
          name="name"
          id={nameId}
          placeholder="School..."
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <Button loading={api.loading} blank>
          <RiCheckLine />
        </Button>
      </div>

      <label htmlFor={hueId}>Hue</label>
      <HueRange
        id={hueId}
        name="hue"
        value={hue}
        disabled={api.loading}
        onChange={(e) => setHue(+e.target.value)}
      />
    </form>
  )
}

export default CollectionForm
