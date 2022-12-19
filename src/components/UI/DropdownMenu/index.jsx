import css from './index.module.scss'
import Checkbox from '$ui/Checkbox'
import { BsChevronDown } from 'react-icons/bs'

const DropdownMenu = ({ title, list }) => {
  return (
    <div className={css.DropdownMenu}>
      <div className={css.header}>
        {title}
        <BsChevronDown />
      </div>

      <ul className={css.content}>{list.map((item) => item.label)}</ul>
    </div>
  )
}

export default DropdownMenu
