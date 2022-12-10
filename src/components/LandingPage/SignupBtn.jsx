import { Link } from 'react-router-dom'

const SignupBtn = ({ label = 'Login' }) => {
  return (
    <Link to="/signup" className={`button button__primary`}>
      {label}
    </Link>
  )
}

export default SignupBtn
