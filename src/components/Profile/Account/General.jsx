import { useEffect, useId, useState } from 'react'
import { FaPen } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import css from './General.module.scss'
import useApi from '$api/useApi'
import Button from '$ui/Button'
import { getInputs } from '$utils/utils'
import userSlice from '$slice/User'

const Group = ({ children, label }) => {
  return (
    <div className={css.group}>
      {label && <p className={css.groupLabel}>{label}</p>}

      <div className={css.groupContent}>{children}</div>
    </div>
  )
}

const General = () => {
  const api = useApi()
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

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    const [formData] = getInputs(e.target)
    if (!formData.avatar[0]) {
      delete formData.avatar
    }
    formData.name ||= undefined
    if (!formData.name && !formData.avatar) return

    const data = await api.patch('/user', formData)
    if (!data) return
    $store(userSlice.updateUser(data.user))
  }

  return (
    <form className={css.General} onSubmit={handleFormSubmit}>
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
          <img src={imgUrl} alt={imgUrl} />
        </label>
      </Group>
      <Group label={'Fullname'}>
        <input type="text" name="name" placeholder={user.name} />
      </Group>

      <Group>
        <Button className="button__primary" loading={api.loading}>
          Save
        </Button>
      </Group>
    </form>
  )
}

export default General
