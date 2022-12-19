import css from './Checkbox.module.scss'
import { RiCheckLine } from 'react-icons/ri'

const Checkbox = ({ selected }) => {
  return (
    <div className={cn(css.checkbox, selected && css.selected)}>
      <RiCheckLine />
    </div>
  )
}

export default Checkbox
