import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import settingsSlice from '$slice/Settings'

import css from './ProximityEffect.module.scss'

const ProximityEffect = () => {
  const dispatch = useDispatch()
  const anchorRef = useRef()
  const [rotateDeg, setRotateDeg] = useState(25)
  const [showEffect, setShowEffect] = useState(false)

  const handleRandomTheme = () => {
    document.body.classList.add(css.documentBody)
    document.body.addEventListener(
      'animationend',
      () => document.body.classList.remove(css.documentBody),
      { once: true }
    )

    setTimeout(() => {
      dispatch(settingsSlice.setRandomHue())
    }, 300)
  }

  useEffect(() => {
    const anchor = anchorRef.current
    let rect, anchorX, anchorY

    const getInfo = () => {
      rect = anchor.getBoundingClientRect()
      anchorX = rect.left + rect.width / 2
      anchorY = rect.top + rect.height / 2
    }

    const angle = (cx, cy, ex, ey) => {
      const dy = ey - cy
      const dx = ex - cx
      const rad = Math.atan2(dy, dx)
      const deg = (rad * 180) / Math.PI
      return deg
    }

    const listnenMouseMove = (e) => {
      const mouseX = e.clientX
      const mouseY = e.clientY
      const deg = angle(mouseX, mouseY, anchorX, anchorY)
      setRotateDeg(deg)
    }

    const listnerMouseEnter = () => setShowEffect(true)
    const listnerMouseLeave = () => setShowEffect(false)

    getInfo()
    window.addEventListener('scroll', getInfo)
    window.addEventListener('resize', getInfo)
    document.addEventListener('mousemove', listnenMouseMove)
    document.addEventListener('mouseenter', listnerMouseEnter)
    document.addEventListener('mouseleave', listnerMouseLeave)
    return () => {
      window.removeEventListener('scroll', getInfo)
      window.removeEventListener('resize', getInfo)
      document.removeEventListener('mousemove', listnenMouseMove)
      document.removeEventListener('mouseenter', listnerMouseEnter)
      document.removeEventListener('mouseleave', listnerMouseLeave)
    }
  }, [])

  const style = {
    transform: `rotate(${rotateDeg - 45}deg)`,
  }

  return (
    <div
      className={`${css.face} ${showEffect ? '' : css.hide}`}
      onClick={handleRandomTheme}
    >
      <div ref={anchorRef} className={css.eyesContainer}>
        <div className={css.eyeBox}>
          <div className={css.eye} style={style} />
        </div>
        <div className={css.eyeBox}>
          <div className={css.eye} style={style} />
        </div>
      </div>
    </div>
  )
}

export default ProximityEffect
