import { useEffect, useRef, useState } from 'react'
import css from './ProximityEffect.module.scss'

const ProximityEffect = () => {
  const anchorRef = useRef()
  const [rotateDeg, setRotateDeg] = useState(90)

  useEffect(() => {
    const listnenMouseMove = e => {
      const mouseX = e.clientX
      const mouseY = e.clientY
      const anchor = anchorRef.current
      const rect = anchor.getBoundingClientRect()
      const anchorX = rect.left + rect.width / 2
      const anchorY = rect.top + rect.height / 2
      const deg = angle(mouseX, mouseY, anchorX, anchorY)
      setRotateDeg(deg)
    }

    const angle = (cx, cy, ex, ey) => {
      const dy = ey - cy
      const dx = ex - cx
      const rad = Math.atan2(dy, dx)
      const deg = (rad * 180) / Math.PI
      return deg
    }

    document.addEventListener('mousemove', listnenMouseMove)
    return () => document.removeEventListener('mousemove', listnenMouseMove)
  }, [])

  return (
    <div className={css.face}>
      <div ref={anchorRef} className={css.eyeBox}>
        <div
          className={css.eye}
          style={{ transform: `rotate(${rotateDeg}deg)` }}
        />
        <div
          className={css.eye}
          style={{ transform: `rotate(${rotateDeg}deg)` }}
        />
      </div>
    </div>
  )
}

export default ProximityEffect
