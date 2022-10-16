import { Link } from 'react-router-dom'
import css from './Signin.module.scss'
import SigninSignup from '@lay/SigninSignup'
import MainForm from '@com/SigninSignup/MainForm'
import { InputGroup as Group } from '@com/SigninSignup/FormUtils'

const Signin = () => {
  return (
    <SigninSignup>
      <MainForm type="signin">
        <Group label="Email or Username">
          <input type="text" />
        </Group>

        <Group label="Password">
          <input type="password" />
        </Group>

        <Link style={{ fontSize: '1.5rem' }} to="/forget-password">
          Forget password?
        </Link>
      </MainForm>
    </SigninSignup>
  )
}

export default Signin
