import { isNotEmptyObject } from '$utils/utils'

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
  searchQuery = searchQuery.toLowerCase().trim()
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

    // Search

    if (searchQuery) {
      if (isNotEmptyObject(selectedFilter))
        return (
          (selectedFilter.name &&
            task.title.toLowerCase().includes(searchQuery)) ||
          (selectedFilter.description &&
            task.description.toLowerCase().includes(searchQuery))
        )
      else {
        return (
          task.title.toLowerCase().includes(searchQuery) ||
          task.description.toLowerCase().includes(searchQuery)
        )
      }
    } else if (isNotEmptyObject(selectedFilter)) return

    return true
  })

  return result.sort((a, b) => {
    const dateA = new Date(a.createdAt).valueOf()
    const dateB = new Date(b.createdAt).valueOf()

    return sortBy === 'a' ? dateA - dateB : dateB - dateA
  })
}
