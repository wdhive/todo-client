import { useState, memo, useMemo } from 'react'
import useActiveState, { stopPropagation } from 'use-active-state'
import useApi from '$api/useApi'
import css from './Participant.module.scss'
import FloatingContent from './FloatingContent'
import avatar from '$assets/avatar.png'
let searchTimeout

const Participant = ({ task, pendingParticipants, setPendingParticipants }) => {
  const api = useApi()
  const [isModalOpen, setIsModalOpen] = useActiveState(false)
  const [selectedRole, setSelectedRole] = useState(() => 'assigner')

  const [searchUsers, setSearchUsers] = useState(() => [])
  const totalUsers = useMemo(() => {
    return [...(task.participants ?? []), ...pendingParticipants]
  }, [task.participants, pendingParticipants])

  const handleAddUser = (user, role) => {
    setPendingParticipants((prev) => [
      ...prev,
      {
        user,
        role,
        pending: true,
      },
    ])
  }

  const handleRemoveUser = (participant) => {
    if (participant.pending) {
      return setPendingParticipants((prev) => {
        return prev.filter((user) => user.user._id !== participant.user._id)
      })
    }

    console.log(participant)
  }

  const handleChangeRole = (participant, role) => {
    if (participant.pending) return

    console.log(participant, role)
  }

  const handleSearchInput = (e) => {
    clearTimeout(searchTimeout)
    searchTimeout = setTimeout(async () => {
      const username = e.target.value
      if (!username) {
        return setSearchUsers([])
      }

      const data = await api.get('/user/search?username=' + username)
      setSearchUsers(data.user)
    }, 500)
  }

  const AddedUsers = useMemo(
    () =>
      totalUsers.map((participant) => (
        <div key={participant.user._id} className={css.user}>
          <img src={participant.user.avatar ?? avatar} alt="" />

          <div>{participant.user.name}</div>

          <FloatingContent
            taskId={task._id}
            role={participant.role}
            active={participant.active}
            pending={participant.pending}
            showModify={true}
            onDelete={() => handleRemoveUser(participant)}
            onChange={(value) => handleChangeRole(participant, value)}
          />
        </div>
      )),
    [totalUsers, task._id]
  )

  const SearchUser = useMemo(() => {
    const inIds = totalUsers.map(({ user }) => user._id)
    const filteredUsers = searchUsers.filter((user) => {
      return !inIds.includes(user._id)
    })

    return filteredUsers.map((user) => {
      return (
        <li
          key={user._id}
          onClick={() => {
            handleAddUser(user, selectedRole)
            setIsModalOpen(false)
          }}
        >
          <img src={user.avatar ?? avatar} className={css.avatar} />

          <div className={css.name}>
            <div>{user.name}</div>
            <div>@{user.username}</div>
          </div>

          <div className={css.date}>
            <div>Joined on</div>
            <div>{user.createdAt}</div>
          </div>
        </li>
      )
    })
  })

  return (
    <div className={css.Participant}>
      <div className={css.participantsInput} onClick={stopPropagation}>
        <input
          onFocus={() => setIsModalOpen(true)}
          onBlur={() => setTimeout(() => setIsModalOpen(false), 200)}
          onChange={handleSearchInput}
          className={css.usernameInput}
          autoComplete="off"
          type="text"
        />

        <FloatingContent
          float={true}
          taskId={task._id}
          role={selectedRole}
          onChange={setSelectedRole}
        />

        <ul className={cn(css.usersModal, isModalOpen && css.activeModal)}>
          {SearchUser.length ? SearchUser : 'No user found'}
        </ul>
      </div>

      <div className={css.currentParticipants}>{AddedUsers}</div>
    </div>
  )
}

export default memo(Participant)
