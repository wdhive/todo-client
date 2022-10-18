import { useNavigate } from 'react-router-dom'
import css from './LoginBtn.module.scss'

const LoginBtn = ({ label = 'Login' }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/signin')
  }

  return (
    <button className={`button button__secondary`} onClick={handleClick}>
      {label}
    </button>
  )
}

export default LoginBtn
