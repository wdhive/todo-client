import css from './Signup.module.scss'
import SigninSignup from '@lay/SigninSignup'
import MainForm from '@com/SigninSignup/MainForm'
import { InputGroup as Group } from '@com/SigninSignup/FormUtils'

const Signup = () => {
  return (
    <SigninSignup>
      <MainForm type="signup">
        {/* <div className={css.imageGroup}>
          <input type="file" name="" id="" />
        </div> */}

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
    </SigninSignup>
  )
}

export default Signup
