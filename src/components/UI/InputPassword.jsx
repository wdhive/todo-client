import { useState } from 'react'
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5'
import css from './InputPassword.module.scss'

const InputPassword = ({
  root,
  button,
  type: startType = 'password',
  ...props
}) => {
  const [type, setType] = useState(startType)

  return (
    <div className={cn(css.InputPassword, root)}>
      <input {...props} type={type} />
      <div
        tabIndex="0"
        type="button"
        className={cn(css.icon, button)}
        onClick={() => {
          setType(type === 'password' ? 'text' : 'password')
        }}
        onKeyDown={(e) => {
          if (e.key === ' ' || e.key === 'Enter') e.target.click()
        }}
      >
        {type === 'password' ? <IoEyeOutline /> : <IoEyeOffOutline />}
      </div>
    </div>
  )
}

export default InputPassword
