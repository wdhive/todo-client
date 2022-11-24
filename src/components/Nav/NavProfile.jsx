import { useSelector } from 'react-redux'
import css from './NavProfile.module.scss'
import LightIcon from '$assets/icons/light.svg?component'
import DarkIcon from '$assets/icons/dark.svg?component'
import AutoIcon from '$assets/icons/auto.svg?component'
import AvatarIcon from '$assets/avatar.png'
import settings from '$slice/settings'

const NavProfile = ({ className }) => {
  const user = useSelector((state) => state.user.user)
  const theme = useSelector((state) => state.settings.theme)

  const handleButtonClick = (theme) => {
    $store(settings.setTheme(theme))
  }

  const handleToggleTheme = () => {
    if (theme.endsWith('light')) {
      $store(settings.setTheme('dark'))
    } else {
      $store(settings.setTheme('light'))
    }
  }

  return (
    <div className={cn(css.NavProfile, className)}>
      <div className={css.profile}>
        <div>
          <img src={user.avatar ?? AvatarIcon} alt="Profile Picture" />
        </div>

        <div>
          <p>Good Afternoon,</p>
          <h6>{user.name}</h6>
        </div>
      </div>

      <div className={css.theme}>
        <button
          className={cn(theme === 'light' && css.active)}
          onClick={() => handleButtonClick('light')}
        >
          <LightIcon />
          <span>light</span>
        </button>

        <button
          className={cn(theme === 'dark' && css.active)}
          onClick={() => handleButtonClick('dark')}
        >
          <DarkIcon />
          <span>dark</span>
        </button>

        <button
          className={cn(theme?.startsWith('auto') && css.active)}
          onClick={() => handleButtonClick()}
        >
          <AutoIcon />
          <span>auto</span>
        </button>

        <button className={css.toggleTheme} onClick={handleToggleTheme}>
          {theme.endsWith('light') ? <DarkIcon /> : <LightIcon />}
        </button>
      </div>
    </div>
  )
}

export default NavProfile
