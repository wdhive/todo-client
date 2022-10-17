import { Link } from 'react-router-dom'
import { Group } from './FormUtils'
import MainForm from './MainForm'

const Signin = props => {
  return (
    <MainForm {...props} type="signin">
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
  )
}

export default Signin

