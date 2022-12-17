import { getInputs } from '$utils/utils'
import User from '$slice/User'

import Modal from '$ui/Uncontrolled/Modal'
import { AdvancedFormControls } from '../Common'

const DeleteAccount = ({ api, goBack }) => {
  const handleFormSubmit = async (e) => {
    e.preventDefault()
    const [formData] = getInputs(e.target)
    const modal = await Modal(undefined, 'This will delete your all data')
    if (!modal.result) return modal.close()

    const data = await api.patch('/user/delete-me', formData)
    modal.close()
    if (!data) return

    $store(User.jwt())
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <AdvancedFormControls api={api} final goBack={goBack} />
    </form>
  )
}

export default DeleteAccount
