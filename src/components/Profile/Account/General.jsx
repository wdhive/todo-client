import { useEffect, useId, useState } from 'react'
import { FaPen } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import css from './General.module.scss'

const Group = ({ children, label }) => {
  return (
    <div className={css.group}>
      {label && <p className={css.groupLabel}>{label}</p>}

      <div className={css.groupContent}>{children}</div>
    </div>
  )
}

const General = () => {
  const avatarId = useId()
  const user = useSelector((state) => state.user.user)
  const [imgUrl, setImgUrl] = useState()

  useEffect(() => {
    setImgUrl(user.avatar)
  }, [user.avatar])

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    setImgUrl(file ? URL.createObjectURL(file) : user.avatar)
  }

  return (
    <form className={css.General}>
      <Group>
        <label htmlFor={avatarId} className={css.imgLabel}>
          <input
            onChange={handleImageChange}
            onFocus={(e) =>
              e.target.parentElement.classList.add(css.imgLabelFocus)
            }
            onBlur={(e) =>
              e.target.parentElement.classList.remove(css.imgLabelFocus)
            }
            className="visually-hidden"
            accept=".png,.jpg,.jpeg,.webp"
            type="file"
            name="avatar"
            id={avatarId}
          />

          <div className={css.imgLabelEdit}>
            <FaPen />
          </div>
          <img src={imgUrl} alt="" />
        </label>
      </Group>
      <Group label={'Fullname'}>
        <input type="text" name="name" />
      </Group>

      <Group>
        <button className='button button__primary'>Save</button>
      </Group>
    </form>
  )
}

export default General
