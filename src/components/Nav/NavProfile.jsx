import { memo, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { MdBrightnessAuto, MdWbSunny } from 'react-icons/md'
import { BsFillMoonStarsFill } from 'react-icons/bs'
import css from './NavProfile.module.scss'
import AvatarIcon from '$assets/avatar.png'
import settings from '$slice/Settings'

const getTime = () => {
  const date = new Date()
  const hour = date.getHours()

  if (hour >= 18) return 'Evening'
  if (hour >= 14) return 'Afternoon'
  if (hour >= 12) return 'Noon'
  if (hour >= 5) return 'Morning'
  return 'Evening'
}

const NavProfile = ({
  className,
  hideTheme,
  showToggleTheme,
  hideOnMobile,
  hideOnPc,
  hideContent,
  column,
  justTheme,
}) => {
  const user = useSelector((state) => state.user.user)
  const theme = useSelector((state) => state.settings.theme ?? 'light')
  const [currentTimePart, setCurrentTimePart] = useState(() => getTime())

  useEffect(() => {
    clearInterval(window.__nav_profile_hourly_interval)
    window.__nav_profile_hourly_interval = setInterval(() => {
      setCurrentTimePart(getTime())
    }, 900000)
  }, [])

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
    <div
      className={cn(
        css.NavProfile,
        hideOnMobile && css.hideOnMobile,
        hideOnPc && css.hideOnPc,
        column === true ? css.columnMode : css.noColumnMode,
        className
      )}
    >
      {justTheme || (
        <div className={cn(css.profile)}>
          <div className={css.imageContainer}>
            <img src={user.avatar ?? AvatarIcon} alt="Profile Picture" />
          </div>

          {hideContent || (
            <div>
              <p>Good {currentTimePart},</p>
              <h6>{user.name}</h6>
            </div>
          )}
        </div>
      )}

      {(!hideTheme || showToggleTheme) && (
        <div className={css.theme}>
          {hideTheme || (
            <>
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
            </>
          )}

          {showToggleTheme && (
            <button className={css.toggleTheme} onClick={handleToggleTheme}>
              {theme.endsWith('light') ? (
                <BsFillMoonStarsFill />
              ) : (
                <MdWbSunny />
              )}
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default memo(NavProfile)
