import { NavLink } from 'react-router-dom'
import {
  MdOutlineAccountCircle,
  MdPeopleOutline,
  MdOutlineExitToApp,
} from 'react-icons/md'
import { RxQuestionMarkCircled, RxChevronRight } from 'react-icons/rx'
import { BiCategory } from 'react-icons/bi'
import css from './NavList.module.scss'
import User from '$slice/User'

const Button = ({ children, arrow = true, to, ...props }) => {
  const content = (
    <>
      <div className={css.buttonContent}>{children}</div>
      {arrow && (
        <div>
          <RxChevronRight />
        </div>
      )}
    </>
  )

  if (to) {
    return (
      <NavLink to={to} className={cn('button', css.button)}>
        {content}
      </NavLink>
    )
  }
  return (
    <button {...props} className={cn('button', css.button)}>
      {content}
    </button>
  )
}

const Group = ({ children, label }) => {
  return (
    <div className={css.group}>
      <div className={css.groupLabel}>{label}</div>
      <div className={css.groupContent}>{children}</div>
    </div>
  )
}

const NavList = ({ mobileMode }) => {
  if (!mobileMode) {
    return (
      <div className={css.Tab}>
        <div className="wrapper">
          <div className={css.tab}>
            <Button to="account" arrow={false}>
              <MdOutlineAccountCircle /> Account Settings
            </Button>

            <Button to="preferences" arrow={false}>
              <BiCategory /> Preferences
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={css.NavList}>
      <div className="wrapper">
        <Group label="General">
          <Button to="account">
            <MdOutlineAccountCircle /> Account
          </Button>
          <Button to="preferences">
            <BiCategory /> Preferences
          </Button>
        </Group>

        <Group label="Information">
          <Button to="/about">
            <MdPeopleOutline />
            About us
          </Button>
          <Button to="/help">
            <RxQuestionMarkCircled /> Help & support
          </Button>
        </Group>

        <Group label="Danger Zone">
          <Button arrow={false} onClick={() => $store(User.jwt())}>
            <MdOutlineExitToApp /> Logout
          </Button>
        </Group>
      </div>
    </div>
  )
}

export default NavList
