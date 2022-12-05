import { useSelector } from 'react-redux'
import css from './Theme.module.scss'
import NavProfile from '$components/Nav/NavProfile'
import settings from '$slice/settings'
let hueTimeout

const Theme = () => {
  const hue = useSelector((state) => state.settings.hue ?? 220)
  const handleHueChange = (e) => {
    clearTimeout(hueTimeout)
    hueTimeout = setTimeout(
      () => $store(settings.updateHue(e.target.value)),
      250
    )
  }

  return (
    <div>
      <NavProfile justTheme />

      <input
        className={css.colorRange}
        onChange={handleHueChange}
        defaultValue={hue}
        type="range"
        min="0"
        max="360"
      />
    </div>
  )
}

export default Theme
