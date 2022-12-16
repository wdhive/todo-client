import { AdvancedFormControls, FormGroup } from '../Common'
import { getInputs } from '$utils/utils'
import User from '$slice/User'

const ChangeUsername = ({ api, goBack }) => {
  const handleFormSubmit = async (e) => {
    e.preventDefault()
    const [formData] = getInputs(e.target)
    const data = await api.patch('/account/change-username', formData)
    if (!data) return
    $store(User.updateUser(data.user))
    goBack(false)
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <FormGroup label="Username">
        <input required type="text" name="new_username" />
      </FormGroup>

      <AdvancedFormControls api={api} final goBack={goBack} />
    </form>
  )
}

export default ChangeUsername
