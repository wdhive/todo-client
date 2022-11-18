import { useId } from 'react'
import css from './Collections.module.scss'

const Collection = ({ collection, setSelected, selected }) => {
  const id = useId()

  const handleChange = () => {
    setSelected(collection._id)
  }

  return (
    <div className={css.collectionGroup}>
      <label htmlFor={id}>
        {setSelected && (
          <input
            id={id}
            className="visually-hidden"
            type="radio"
            name="collection"
            checked={selected}
            onChange={handleChange}
            value={collection._id}
          />
        )}

        {collection.hue && (
          <div
            className={css.collectionColor}
            style={{ background: `hsl(${collection.hue}, 100%, 50%)` }}
          />
        )}

        <span>{collection.name}</span>
      </label>
    </div>
  )
}
export default Collection
