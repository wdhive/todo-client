import css from './Sidebar.module.scss'
import DropdownMenu from '$ui/DropdownMenu'

const SearchSidebar = ({
  collections,
  participants,
  filterList,
  setSelectedFilter,
  setSelectedCollections,
  setSelectedParticipants,
}) => {
  return <DropdownMenu title="Filter" list={filterList} />
}

export default SearchSidebar
