import SubForm from './SubForm'
import { Group } from './FormUtils'
import InputPassword from '$ui/InputPassword'

const ResetPassword = props => {
  return (
    <SubForm {...props} buttonLabel="Change Password">
      <Group label="New Password">
        <InputPassword type="password" name="password" required />
      </Group>

      <Group label="Confirm New Password">
        <InputPassword type="password" name="new_password" required />
      </Group>
    </SubForm>
  )
}

export default ResetPassword
