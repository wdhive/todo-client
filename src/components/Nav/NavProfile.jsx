import { memo } from 'react'
import { useSelector } from 'react-redux'
import css from './NavProfile.module.scss'
import AvatarIcon from '$assets/avatar.png'
import settings from '$slice/settings'
import { MdBrightnessAuto, MdWbSunny } from 'react-icons/md'
import { BsFillMoonStarsFill } from 'react-icons/bs'

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

  const getTime = () => {
    const date = new Date()
    const hour = date.getHours()

    if (hour >= 18) return 'Evening'
    if (hour >= 14) return 'Afternoon'
    if (hour >= 12) return 'Noon'
    if (hour >= 5) return 'Morning'
    return 'Evening'
  }

  return (
    <div className={cn(css.NavProfile, className)}>
      <div className={css.profile}>
        <div>
          <img src={user.avatar ?? AvatarIcon} alt="Profile Picture" />
        </div>

        <div>
          <p>Good {getTime()},</p>
          <h6>{user.name}</h6>
        </div>
      </div>

      <div className={css.theme}>
        <button
          className={cn(theme === 'light' && css.active)}
          onClick={() => handleButtonClick('light')}
        >
          <MdWbSunny />
          <span>light</span>
        </button>

        <button
          className={cn(theme === 'dark' && css.active)}
          onClick={() => handleButtonClick('dark')}
        >
          <BsFillMoonStarsFill />
          <span>dark</span>
        </button>

        <button
          className={cn(theme?.startsWith('auto') && css.active)}
          onClick={() => handleButtonClick()}
        >
          <MdBrightnessAuto />
          <span>auto</span>
        </button>

        <button className={css.toggleTheme} onClick={handleToggleTheme}>
          {theme.endsWith('light') ? <BsFillMoonStarsFill /> : <MdWbSunny />}
        </button>
      </div>
    </div>
  )
}

export default memo(NavProfile)
