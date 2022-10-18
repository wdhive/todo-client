import { useNavigate } from 'react-router-dom'

const SignupBtn = ({ label = 'Signup' }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/signup')
  }

  return (
    <button className={`button button__primary`} onClick={handleClick}>
      {label}
    </button>
  )
}

export default SignupBtn
