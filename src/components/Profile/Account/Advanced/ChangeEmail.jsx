import { useRef, useState } from 'react'
import { getInputs } from '$utils/utils'
import { useSelector } from 'react-redux'
import User from '$slice/User'

import { AdvancedFormControls, FormGroup } from '../Common'

const ChangeEmail = ({ api, goBack }) => {
  const currentEmail = useSelector((state) => state.user.user?.email)
  const [otpSent, setOtpSent] = useState()
  const emailRef = useRef()

  const handleEmailSubmit = async () => {
    const data = await api.post('/account/request-email-verify', {
      email: emailRef.current?.value?.trim(),
    })
    if (data) setOtpSent(true)
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    const [formData] = getInputs(e.target)
    const data = await api.patch('/account/change-email', formData)
    if (!data) return
    $store(User.updateUser(data.user))
    goBack(false)
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <FormGroup label="Email">
        <input
          required
          type="email"
          name="new_email"
          disabled={otpSent}
          ref={emailRef}
          placeholder={currentEmail}
        />
      </FormGroup>

      {otpSent && (
        <FormGroup label="OTP Code">
          <input
            required
            type="text"
            name="code"
            maxLength={6}
            minLength={6}
            style={{ textAlign: 'center' }}
          />
        </FormGroup>
      )}

      <AdvancedFormControls
        api={api}
        final={otpSent}
        onNext={handleEmailSubmit}
        goBack={goBack}
      />
    </form>
  )
}

export default ChangeEmail
