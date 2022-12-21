import { isNotEmptyObject } from '$utils/utils'
import Fuse from 'fuse.js'

const fuseSearch = (list, filter, query) => {
  if (!query) return list

  const fuse = new Fuse(list, {
    keys: isNotEmptyObject(filter)
      ? Object.keys(filter)
      : ['title', 'description'],

    threshold: 0.5,
  })

  return fuse.search(query.toLowerCase()).map(({ item }) => item)
}

export default (
  tasks,
  {
    sortBy,
    searchQuery,
    selectedFilter,
    selectedCollections,
    selectedParticipants,
  }
) => {
  searchQuery = searchQuery.trim()
  if (
    !searchQuery &&
    !isNotEmptyObject(selectedFilter) &&
    !isNotEmptyObject(selectedCollections) &&
    !isNotEmptyObject(selectedParticipants)
  ) {
    return
  }

  const result = tasks.filter((task) => {
    // Task collection
    if (
      isNotEmptyObject(selectedCollections) &&
      !selectedCollections[task.collection]
    ) {
      return
    }

    // Task participants
    if (isNotEmptyObject(selectedParticipants)) {
      let found = false
      const allUsers = [
        task.owner._id,
        task.completedBy?._id,
        ...task.participants.map((p) => p.user._id),
      ]

      allUsers.forEach((userId) => {
        found = selectedParticipants[userId]
      })

      if (!found) return
    }

    return true
  })

  const searched = fuseSearch(result, selectedFilter, searchQuery)

  return searched.sort((a, b) => {
    const dateA = new Date(a.createdAt).valueOf()
    const dateB = new Date(b.createdAt).valueOf()

    return sortBy === 'a' ? dateA - dateB : dateB - dateA
  })
}
