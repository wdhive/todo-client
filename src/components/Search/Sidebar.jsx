import css from './Sidebar.module.scss'
import DropdownCheck from '$ui/DropdownCheck'

const SearchSidebar = ({
  collections,
  participants,
  filterList,
  setSelectedFilter,
  setSelectedCollections,
  setSelectedParticipants,
}) => {
  const commonProps = {
    className: css.DropDown,
    classNames: css,
    useFloat: false,
  }

  return (
    <>
      <DropdownCheck
        list={filterList}
        onChange={setSelectedFilter}
        title="Filter"
        {...commonProps}
      />
      <DropdownCheck
        title="Collections"
        list={collections}
        onChange={setSelectedCollections}
        {...commonProps}
      />
      <DropdownCheck
        title="Participants"
        list={participants}
        onChange={setSelectedParticipants}
        {...commonProps}
      />
    </>
  )
}

export default SearchSidebar
