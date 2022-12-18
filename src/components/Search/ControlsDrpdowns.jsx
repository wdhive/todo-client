import css from './ControlsDrpdowns.module.scss'
import DropdownCheck from '$ui/DropdownCheck'

const ControlsDrpdowns = ({ collections, participants }) => {
  return (
    <div className={css.container}>
      <DropdownCheck
        label="Filter"
        classNames={css}
        list={[
          {
            label: 'Name',
            value: 'name',
          },
          {
            label: 'Description',
            value: 'description',
          },
        ]}
      />

      <DropdownCheck label="Collections" classNames={css} list={collections} />
      <DropdownCheck label="Participant" classNames={css} list={participants} />
    </div>
  )
}

export default ControlsDrpdowns
