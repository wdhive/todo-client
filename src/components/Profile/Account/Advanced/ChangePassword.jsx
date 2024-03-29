import { getInputs } from '$utils/utils'
import User from '$slice/User'

import { AdvancedFormControls, FormGroup } from '../Common'
import InputPassword from '$ui/InputPassword'

const ChangePassword = ({ api, goBack }) => {
  const handleFormSubmit = async (e) => {
    e.preventDefault()
    const [formData] = getInputs(e.target)

    if (formData.confirm_new_password !== formData.new_password) {
      return api.setStatus.error("Both password didn't matched")
    }
    delete formData.confirm_new_password

    const data = await api.patch('/account/change-password', formData)
    if (!data) return
    $store(User.jwt(data.token))
    goBack(false)
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <FormGroup label="New Password">
        <InputPassword required type="password" name="new_password" />
      </FormGroup>

      <FormGroup label="Confirm New Password">
        <InputPassword required type="password" name="confirm_new_password" />
      </FormGroup>

      <AdvancedFormControls api={api} final goBack={goBack} />
    </form>
  )
}

export default ChangePassword
