import css from './ResetPassword.module.scss'
import SubForm from './SubForm'
import { Group } from './FormUtils'

const ForgetPassword = props => {
  return (
    <SubForm props={props} buttonLabel="Change Password">
      <Group label="New Password">
        <input type="password" name="" id="" />
      </Group>

      <Group label="Confirm New Password">
        <input type="password" name="" id="" />
      </Group>
    </SubForm>
  )
}

export default ForgetPassword
