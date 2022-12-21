import { memo } from 'react'

import css from './ControlsDrpdowns.module.scss'
import DropdownCheck from '$ui/DropdownCheck'

const ControlsDrpdowns = ({
  collections,
  participants,
  filterList,
  setSelectedFilter,
  setSelectedCollections,
  setSelectedParticipants,
}) => {
  return (
    <div className={css.container}>
      <DropdownCheck
        label="Filter"
        classNames={css}
        list={filterList}
        onChange={(f) => {
          setSelectedFilter(f)
        }}
      />

      <DropdownCheck
        label="Collections"
        classNames={css}
        list={collections}
        onChange={(c) => {
          setSelectedCollections(c)
        }}
      />

      <DropdownCheck
        label="Participant"
        classNames={css}
        list={participants}
        onChange={(p) => {
          setSelectedParticipants(p)
        }}
      />
    </div>
  )
}

export default memo(ControlsDrpdowns)
