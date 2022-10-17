import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import css from './ProximityEffect.module.scss'
import settingsSlice from '@store/slice/settings'

const ProximityEffect = () => {
  const dispatch = useDispatch()
  const anchorRef = useRef()
  const [rotateDeg, setRotateDeg] = useState(90)

  const handleRandomTheme = () => {
    dispatch(settingsSlice.setRandomHue())
  }

  useEffect(() => {
    const anchor = anchorRef.current

    const listnenMouseMove = e => {
      const rect = anchor.getBoundingClientRect()
      const anchorX = rect.left + rect.width / 2
      const anchorY = rect.top + rect.height / 2

      const mouseX = e.clientX
      const mouseY = e.clientY
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

  const style = {
    transform: `rotate(${rotateDeg - 45}deg)`,
  }

  return (
    <div className={css.face} onClick={handleRandomTheme}>
      <div ref={anchorRef} className={css.eyeBox}>
        <div className={css.eye} style={style} />
        <div className={css.eye} style={style} />
      </div>
    </div>
  )
}

export default ProximityEffect
