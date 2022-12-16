import { useEffect, useRef, useState } from 'react'
import css from './HueRange.module.scss'

const HueRange = ({ className, onChange, style = {}, ...props }) => {
  const inputRef = useRef()
  const [hue, setHue] = useState()

  useEffect(() => {
    setHue(inputRef.current.value)
  }, [{}])

  return (
    <input
      ref={inputRef}
      onChange={(e) => {
        setHue(e.target.value)
        onChange(e)
      }}
      className={cn(css.HueRange, className)}
      min="0"
      max="360"
      type="range"
      style={{
        ...style,
        color: `hsl(${hue}, 100%, 50%)`,
      }}
      {...props}
    />
  )
}

export default HueRange
