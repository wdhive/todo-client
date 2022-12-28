export const notificationMessages = {
  'task-invitation': '{user} has invited you to join a task',
  'task-invitation-accepted': '{user} accepted you invitation request',
  'task-invitation-denied': '{user} denied to join your task',
  'task-particiapnt-left': '{user} left from your task',
  'task-particiapnt-removed': '{user} removed you from a task',
}

export default (type, name) => {
  const msg = notificationMessages[type]
  if (!msg) return 'No info...'
  return msg.replace(/{user}/gim, name)
}
