import { memo, useId, useMemo, useState } from 'react'
import { FaPen } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import css from './General.module.scss'
import useApi from '$api/useApi'
import Button from '$ui/Button'
import { getFormData, getInputs } from '$utils/utils'
import User from '$slice/User'

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

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    setImgUrl(file && URL.createObjectURL(file))
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    const [formData] = getInputs(e.target)
    if (!formData.avatar[0]) {
      delete formData.avatar
    } else {
      formData.avatar = formData.avatar[0]
    }
    if (!formData.name) delete formData.name
    if (!formData.name && !formData.avatar) return

    const data = await api.patch('/user', getFormData(formData))
    if (!data) return
    $store(User.updateUser(data.user))
    setImgUrl(false)
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
            files
            id={avatarId}
          />

          <div className={css.imgLabelEdit}>
            <FaPen />
          </div>
          <img src={imgUrl || user.avatar} alt={user.avatar} />
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

export default memo(General)
