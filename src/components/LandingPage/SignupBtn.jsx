import { useNavigate } from 'react-router-dom'
import css from './SignupBtn.module.scss'

const SignupBtn = ({ label = 'Signup' }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/signup')
  }

  return (
    <button className={`hello world`} onClick={handleClick}>
      {label}
    </button>
  )
}

export default SignupBtn
