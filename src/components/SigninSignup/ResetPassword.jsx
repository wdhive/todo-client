import SubForm from './SubForm'
import { Group } from './FormUtils'

const ResetPassword = props => {
  return (
    <SubForm {...props} buttonLabel="Change Password">
      <Group label="New Password">
        <input type="password" name="password" required />
      </Group>

      <Group label="Confirm New Password">
        <input type="password" name="new_password" required />
      </Group>
    </SubForm>
  )
}

export default ResetPassword
