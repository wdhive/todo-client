import { useState } from 'react'
import css from './FontSize.module.scss'

const FontSize = () => {
  const [fontSize, setFontSize] = useState(16)

  return (
    <div className={css.FontSize}>
      <div className={css.controls}>
        <p>{fontSize}</p>

        <input
          type="range"
          max="24"
          min="8"
          value={fontSize}
          onChange={(e) => setFontSize(+e.target.value)}
        />
      </div>

      <p style={{ fontSize: `${fontSize / 10}rem` }} className={css.sample}>
        A quick brown fox jumps over the lazy dog.
      </p>
    </div>
  )
}

export default FontSize
