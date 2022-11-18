import css from './NavProfile.module.scss'
import LightIcon from '$assets/icons/light.svg?component'
import DarkIcon from '$assets/icons/dark.svg?component'
import AutoIcon from '$assets/icons/auto.svg?component'
import AvatarIcon from '$assets/avatar.png'
import { useSelector } from 'react-redux'

const NavProfile = ({ className }) => {
  const user = useSelector((state) => state.user.user)

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
        <button className={css.active}>
          <LightIcon />
          <span>light</span>
        </button>

        <button>
          <DarkIcon />
          <span>dark</span>
        </button>

        <button>
          <AutoIcon />
          <span>auto</span>
        </button>

        <button className={css.toggleTheme}>
          <AutoIcon />
        </button>
      </div>
    </div>
  )
}

export default NavProfile
