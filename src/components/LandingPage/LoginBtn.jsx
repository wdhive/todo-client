import { Link } from 'react-router-dom'

const LoginBtn = ({ label = 'Login' }) => {
  return (
    <Link to="/signin" className={`button button__secondary`}>
      {label}
    </Link>
  )
}

export default LoginBtn
