import { memo, useId } from 'react'
import { IoSearchOutline } from 'react-icons/io5'

import css from './Header.module.scss'
import ControlsDrpdowns from './ControlsDrpdowns'

const Header = ({ mobileMode, searchQuery, setSearchQuery, ...props }) => {
  const searchId = useId()

  return (
    <div>
      <div className={css.search}>
        <input
          type="text"
          placeholder="Search..."
          id={searchId}
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value)
          }}
        />

        <label className={css.searchIcon} htmlFor={searchId}>
          <IoSearchOutline />
        </label>
      </div>

      {mobileMode && <ControlsDrpdowns {...props} />}
    </div>
  )
}

export default memo(Header)
