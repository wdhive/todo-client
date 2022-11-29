import { useState, memo, useMemo } from 'react'
import useActiveState, { stopPropagation } from 'use-active-state'
import { useSelector } from 'react-redux'
import useApi from '$api/useApi'
import css from './Participant.module.scss'
import FloatingContent from './FloatingContent'
import avatar from '$assets/avatar.png'
let searchTimeout

const Participant = ({ task, pendingParticipants, setPendingParticipants }) => {
  const api = useApi()
  const userId = useSelector((state) => state.user.user?._id)
  const [isModalOpen, setIsModalOpen] = useActiveState(false)
  const [selectedRole, setSelectedRole] = useState(() => 'assigner')
  const [searchUsers, setSearchUsers] = useState(() => [])
  const totalUsers = useMemo(() => {
    return [...(task.participants ?? []), ...pendingParticipants]
  }, [task.participants, pendingParticipants])

  const handleAddUser = (user) => {
    setPendingParticipants((prev) => [
      ...prev,
      {
        user,
        role: selectedRole,
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
    }, 300)
  }

  const AddedUsers = useMemo(() => {
    return totalUsers.map((participant) => (
      <div key={participant.user._id} className={css.user}>
        <img src={participant.user.avatar ?? avatar} alt="" />

        <div>{participant.user.name}</div>

        <FloatingContent
          taskId={task._id}
          active={participant.active}
          pending={participant.pending}
          showModify={true}
          default={participant.role}
          onDelete={() => handleRemoveUser(participant)}
          onChange={(value) => handleChangeRole(participant, value)}
          name={
            participant.pending
              ? 'participant ' + participant.user._id
              : undefined
          }
        />
      </div>
    ))
  }, [totalUsers, task._id])

  const SearchUser = useMemo(() => {
    const inIds = [userId, ...totalUsers.map(({ user }) => user._id)]
    const filteredUsers = searchUsers.filter((user) => {
      return !inIds.includes(user._id)
    })

    return filteredUsers.map((user) => {
      return (
        <li
          key={user._id}
          onClick={() => {
            handleAddUser(user)
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
  }, [userId, totalUsers, searchUsers])

  return (
    <div className={css.Participant}>
      <div className={css.participantsInput} onClick={stopPropagation}>
        <input
          onFocus={() => setIsModalOpen(true)}
          // onBlur={() => setTimeout(() => setIsModalOpen(false), 200)}
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
          {SearchUser.length ? (
            SearchUser
          ) : (
            <p className={css.noUserFound}>An egg...</p>
          )}
        </ul>
      </div>

      <div className={css.currentParticipants}>{AddedUsers}</div>
    </div>
  )
}

export default memo(Participant)
