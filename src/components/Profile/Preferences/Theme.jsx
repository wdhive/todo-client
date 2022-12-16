import { useSelector } from 'react-redux'
import NavProfile from '$components/Nav/NavProfile'
import settings from '$slice/Settings'
import HueRange from './HueRange'
import Dialog from '$ui/Dialog'
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
      <Dialog />
      <HueRange onChange={handleHueChange} defaultValue={hue} />
    </div>
  )
}

export default Theme
