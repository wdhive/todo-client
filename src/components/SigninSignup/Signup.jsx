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
        {previewImageSrc ? <img src={previewImageSrc} /> : <CameraIcon />}

        <input
          onChange={handlePickImage}
          ref={inputFileRef}
          type="file"
          name=""
          id=""
        />
      </div>

      <Group label="Full Name*">
        <input type="text" />
      </Group>

      <Group label="Username*">
        <input type="text" />
      </Group>

      <Group label="Password*">
        <input type="text" />
      </Group>

      <Group label="Confirm Password*">
        <input type="text" />
      </Group>
    </MainForm>
  )
}

export default Signup
