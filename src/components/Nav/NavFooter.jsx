import { Link } from 'react-router-dom'
import { FaGithub, FaRegQuestionCircle, FaChevronDown } from 'react-icons/fa'
import { SlPeople } from 'react-icons/sl'

import css from './NavFooter.module.scss'

const NavFooter = ({ setNavExpand }) => {
  return (
    <div className={css.NavFooter}>
      <div className={css.icons}>
        <Link to="/help">
          <FaRegQuestionCircle />
        </Link>
        <Link to="/about">
          <SlPeople />
        </Link>
        <a target="_blank" href="https://github.com/BabyDevs/Todo-App">
          <FaGithub />
        </a>
      </div>

      <div>
        <button
          onClick={() => setNavExpand((prev) => !prev)}
          className={css.toggleNav}
        >
          <FaChevronDown />
        </button>
      </div>
    </div>
  )
}

export default NavFooter
