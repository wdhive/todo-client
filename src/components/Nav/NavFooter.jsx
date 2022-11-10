import css from './NavFooter.module.scss'
import HelpIcon from '@ass/icons/help-&-support.svg?component'
import GithubIcon from '@ass/icons/github.svg?component'
import AboutIcon from '@ass/icons/about-us.svg?component'
import BackIcon from '@ass/icons/chev-down.svg?component'

const NavFooter = ({ navExpand, setNavExpand }) => {
  return (
    <div className={css.NavFooter}>
      <div className={css.icons}>
        <button>
          <AboutIcon />
        </button>
        <button>
          <HelpIcon />
        </button>
        <button>
          <GithubIcon />
        </button>
      </div>

      <div>
        <button
          onClick={() => setNavExpand((prev) => !prev)}
          className={css.toggleNav}
        >
          <BackIcon />
        </button>
      </div>
    </div>
  )
}

export default NavFooter
