import { useState, useEffect, memo } from 'react'
import useActiveState, { stopPropagation } from 'use-active-state'
import useApi from '$api/useApi'
import css from './Participant.module.scss'
import FloatingContent from './FloatingContent'

const Participant = ({ taskId, participants }) => {
  const api = useApi()
  const [isModalOpen, setIsModalOpen] = useActiveState(false)
  const [foundUsers, setFoundUsers] = useState(() => [])
  const [users, setUsers] = useState(() => [])

  useEffect(() => {
    ;(async () => {
      const data = await api.get('/user/search?username=say')
      setFoundUsers(data.user)
    })()
  }, [])

  return (
    <div className={css.Participant}>
      <div className={css.participantsInput} onClick={stopPropagation}>
        <input
          onFocus={() => setIsModalOpen(true)}
          onBlur={() => setTimeout(() => setIsModalOpen(false), 100)}
          className={css.usernameInput}
          name="participants"
          autoComplete="off"
          type="text"
        />

        <FloatingContent taskId={taskId} />

        <ul className={cn(css.usersModal, isModalOpen && css.activeModal)}>
          {foundUsers.map((user) => (
            <li
              key={user._id}
              onClick={() => {
                setUsers((prev) => [...prev, user])
                setIsModalOpen(false)
              }}
            >
              <img src={user.avatar} className={css.avatar} />

              <div className={css.name}>
                <div>{user.name}</div>
                <div>@{user.username}</div>
              </div>

              <div className={css.date}>
                <div>Joined on</div>
                <div>{user.createdAt}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className={css.currentParticipants}>
        {users.map((user) => (
          <div key={user._id} className={css.user}>
            <img src={user.avatar} alt="" />
            <div>{user.name}</div>
            <FloatingContent taskId={taskId} showModify={true} float={false} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default memo(Participant)
