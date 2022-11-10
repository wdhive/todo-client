import css from './NavProfile.module.scss'
import LightIcon from '@ass/icons/light.svg?component'
import DarkIcon from '@ass/icons/dark.svg?component'
import AutoIcon from '@ass/icons/auto.svg?component'
import AvatarIcon from '@ass/avatar.png'

const NavProfile = () => {
  return (
    <div className={css.NavProfile}>
      <div className={css.profile}>
        <img src={AvatarIcon} alt="Profile Picture" />
        <p>Good Afternoon,</p>
        <h6>John Doe</h6>
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
      </div>
    </div>
  )
}

export default NavProfile
