import { useSelector } from 'react-redux'
import { useMemo, useState } from 'react'
import useMobileLayout from '$hooks/useMobileLayout'

import css from './Search.module.scss'
import SearchSidebar from '$components/Search/Sidebar'
import SearchMain from '$components/Search/Main'
import Header from '$components/Search/Header'

const Search = () => {
  const mobileMode = useMobileLayout()

  const [sortBy, setSortBy] = useState('a')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilter, setSelectedFilter] = useState({})
  const [selectedCollections, setSelectedCollections] = useState({})
  const [selectedParticipants, setSelectedParticipants] = useState({})

  const collections = useTaskCollections(selectedCollections)
  const participants = useTaskParticipants(selectedParticipants)
  const filterList = useMemo(
    () => [
      {
        label: 'Name',
        value: 'title',
        selected: selectedFilter['title'],
      },
      {
        label: 'Description',
        value: 'description',
        selected: selectedFilter['description'],
      },
    ],
    []
  )

  const commonProps = useMemo(
    () => ({
      sortBy,
      filterList,
      collections,
      participants,
      setSortBy,
      setSelectedFilter,
      setSelectedCollections,
      setSelectedParticipants,
    }),
    [
      sortBy,
      filterList,
      collections,
      participants,
      setSortBy,
      setSelectedFilter,
      setSelectedCollections,
      setSelectedParticipants,
    ]
  )

  return (
    <div className={css.Search}>
      {mobileMode || (
        <div className={css.sidebar}>
          <SearchSidebar {...commonProps} />
        </div>
      )}

      <div className={css.content}>
        <div className={css.controls}>
          <div className="wrapper">
            <Header
              {...commonProps}
              mobileMode={mobileMode}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </div>
        </div>

        <div className={css.main}>
          <div className="wrapper">
            <SearchMain
              sortBy={sortBy}
              setSortBy={setSortBy}
              searchQuery={searchQuery}
              selectedFilter={selectedFilter}
              selectedCollections={selectedCollections}
              selectedParticipants={selectedParticipants}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Search

const useTaskParticipants = (selectedParticipants) => {
  const tasks = useSelector((state) => state.tasks.tasks)
  const userId = useSelector((state) => state.user.user._id)

  return useMemo(() => {
    const participants = []
    const pushParticipants = (user) => {
      if (user._id === userId) return

      participants.push(
        JSON.stringify({
          value: user._id,
          label: user.name,
          selected: selectedParticipants[user._id],
        })
      )
    }

    tasks.forEach((task) => {
      pushParticipants(task.owner)
      task.participants.forEach((p) => pushParticipants(p.user))
    })

    return [...new Set(participants)].map(JSON.parse)
  }, [tasks, userId])
}

const useTaskCollections = (selectedCollections) => {
  const taskCollections = useSelector((state) => state.settings.collections)

  return useMemo(
    () =>
      taskCollections.map((col) => {
        return {
          label: col.name,
          value: col._id,
          selected: selectedCollections[col._id],
        }
      }),

    [taskCollections]
  )
}
