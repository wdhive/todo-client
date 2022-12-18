import { useSelector } from 'react-redux'

import css from './Search.module.scss'
import SearchSidebar from '$components/Search/Sidebar'
import SearchMain from '$components/Search/Main'
import SearchControls from '$components/Search/Controls'
import { useMemo } from 'react'

const Search = () => {
  const collections = useTaskCollections()
  const participants = useTaskParticipants()

  const commonProps = { collections, participants }

  return (
    <div className={css.Search}>
      <div className={css.sidebar}>
        <SearchSidebar {...commonProps} />
      </div>

      <div className={css.content}>
        <div className={css.controls}>
          <SearchControls {...commonProps} />
        </div>

        <div className={css.main}>
          <SearchMain />
        </div>
      </div>
    </div>
  )
}

export default Search

const useTaskParticipants = () => {
  const tasks = useSelector((state) => state.tasks.tasks)
  const userId = useSelector((state) => state.user.user._id)

  return useMemo(() => {
    const participants = []
    tasks.forEach((task) => {
      participants.push(JSON.stringify(task.owner))

      task.participants.forEach((p) => {
        participants.push(JSON.stringify(p.user))
      })
    })

    const parsedUsers = [...new Set(participants)].map((user) => {
      const parsed = JSON.parse(user)
      return {
        value: parsed._id,
        label: parsed.name,
      }
    })

    return parsedUsers.filter(({ value }) => value !== userId)
  }, [tasks, userId])
}

const useTaskCollections = () => {
  const taskCollections = useSelector((state) => state.settings.collections)

  return useMemo(
    () =>
      taskCollections.map((col) => {
        return {
          label: col.name,
          value: col._id,
        }
      }),

    [taskCollections]
  )
}
