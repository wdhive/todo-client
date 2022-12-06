import css from './CollectionForm.module.scss'
import HueRange from './HueRange'
import { RiCheckLine } from 'react-icons/ri'
import { useEffect, useId, useState } from 'react'

const CollectionForm = ({ collection }) => {
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

  const handleFormSubmit = (e) => {
    e.preventDefault()
    if (hue === collection.hue && name === collection.name) return

    console.log(hue, name)
  }

  return (
    <form
      onSubmit={handleFormSubmit}
      className={css.CollectionForm}
      style={{ color: `hsl(${hue}, 50%, 50%)` }}
    >
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
        <button>
          <RiCheckLine />
        </button>
      </div>

      <label htmlFor={hueId}>Hue</label>
      <HueRange
        id={hueId}
        name="hue"
        value={hue}
        onChange={(e) => setHue(+e.target.value)}
      />
    </form>
  )
}

export default CollectionForm
