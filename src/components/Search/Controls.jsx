import css from './Controls.module.scss'
import ControlsDrpdowns from './ControlsDrpdowns'

const SearchControls = ({ collections, participants }) => {
  return (
    <div>
      <ControlsDrpdowns collections={collections} participants={participants} />
    </div>
  )
}

export default SearchControls
