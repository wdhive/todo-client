import { memo, useId, useMemo, useState } from 'react'
import { FaPen } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import useApi from '$api/useApi'
import { getFormData } from '$utils/utils'
import User from '$slice/User'

import css from './General.module.scss'
import { FormGroup } from './Common'
import Layout from './Layout'
import Button from '$ui/Button'

const General = () => {
  const api = useApi()
  const avatarId = useId()
  const user = useSelector((state) => state.user.user)
  const [fullName, setFullName] = useState('')
  const [avatarFile, setAvatarFile] = useState()

  const handleFormSubmit = async (e) => {
    e.preventDefault()

    const formData = {}
    if (fullName) formData.name = fullName
    if (avatarFile) formData.avatar = avatarFile

    const data = await api.patch('/user', getFormData(formData))
    if (!data) return
    $store(User.updateUser(data.user))
    setFullName('')
    setAvatarFile()
  }

  const imgUrl = useMemo(() => {
    return avatarFile && URL.createObjectURL(avatarFile)
  }, [avatarFile])

  return (
    <Layout className={css.General}>
      <form onSubmit={handleFormSubmit}>
        <FormGroup>
          <label htmlFor={avatarId} className={css.imgLabel}>
            <input
              onChange={(e) => setAvatarFile(e.target.files[0])}
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
            <img src={imgUrl || user.avatar} alt={user.avatar} />
          </label>
        </FormGroup>
        <FormGroup label={'Fullname'}>
          <input
            type="text"
            name="name"
            placeholder={user.name}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Button className="button__primary" loading={api.loading}>
            Save
          </Button>
        </FormGroup>
      </form>
    </Layout>
  )
}

export default memo(General)
