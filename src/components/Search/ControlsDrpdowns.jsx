import css from './ControlsDrpdowns.module.scss'
import DropdownCheck from '$ui/DropdownCheck'
import { memo, useMemo } from 'react'

const ControlsDrpdowns = ({
  collections,
  participants,
  selectedFilter,
  setSelectedFilter,
  setSelectedCollections,
  setSelectedParticipants,
}) => {
  const handleChange = (setState, newList) => {
    const selected = newList
      .filter((i) => i.selected)
      .map((i) => [i.value, true])
    setState(Object.fromEntries(selected))
  }

  const filterList = useMemo(
    () => [
      {
        label: 'Name',
        value: 'name',
        selected: selectedFilter['name'],
      },
      {
        label: 'Description',
        value: 'description',
        selected: selectedFilter['description'],
      },
    ],
    []
  )

  return (
    <div className={css.container}>
      <DropdownCheck
        label="Filter"
        classNames={css}
        list={filterList}
        onChange={(f) => {
          handleChange(setSelectedFilter, f)
        }}
      />

      <DropdownCheck
        label="Collections"
        classNames={css}
        list={collections}
        onChange={(c) => {
          handleChange(setSelectedCollections, c)
        }}
      />

      <DropdownCheck
        label="Participant"
        classNames={css}
        list={participants}
        onChange={(p) => {
          handleChange(setSelectedParticipants, p)
        }}
      />
    </div>
  )
}

export default memo(ControlsDrpdowns)
