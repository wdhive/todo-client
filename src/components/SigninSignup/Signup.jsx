import css from './Signup.module.scss'
import MainForm from './MainForm'
import { Group } from './FormUtils'
import CameraIcon from '@ass/icons/camera.svg?component'
import { useRef, useState } from 'react'

const Signup = props => {
  const [previewImageSrc, setPreviewImageSrc] = useState(null)
  const inputFileRef = useRef()
  const clickPickImage = () => inputFileRef.current.click()

  const handlePickImage = e => {
    const file = e.target.files[0]
    if (file) {
      setPreviewImageSrc(URL.createObjectURL(file))
    } else {
      setPreviewImageSrc(null)
    }
  }

  return (
    <MainForm {...props} type="signup">
      <div className={css.image} onClick={clickPickImage}>
        <input
          onChange={handlePickImage}
          ref={inputFileRef}
          type="file"
          name="avatar"
        />

        <div className={css.image__preview}>
          {previewImageSrc ? <img src={previewImageSrc} /> : <CameraIcon />}
        </div>
      </div>

      <Group label="Full Name*">
        <input type="text" name="name" required />
      </Group>

      <Group label="Username*">
        <input type="text" name="username" required />
      </Group>

      <Group label="Password*">
        <input type="text" name="password" required />
      </Group>

      <Group label="Confirm Password*">
        <input type="text" name="confirmPassword" required />
      </Group>
    </MainForm>
  )
}

export default Signup
