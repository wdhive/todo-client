import { useSelector } from 'react-redux'
import settings from '$slice/Settings'

import HueRange from './HueRange'
import NavProfile from '$components/Nav/NavProfile'
let hueTimeout

const Theme = () => {
  const hue = useSelector((state) => state.settings.hue ?? 220)
  const handleHueChange = (e) => {
    clearTimeout(hueTimeout)
    hueTimeout = setTimeout(
      () => $store(settings.updateHue(e.target.value)),
      100
    )
  }

  return (
    <div>
      <NavProfile justTheme />
      <HueRange onChange={handleHueChange} defaultValue={hue} />
    </div>
  )
}

export default Theme
