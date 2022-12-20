import { useRef, useState, useEffect } from 'react'
import user from '$slice/User'
import useApi from '$api/useApi'
import { getFormData } from '$utils/utils'

import SigninSignup from '$layouts/SigninSignup'
import SignupForm from '$components/SigninSignup/Signup'
import EmailVerify from '$components/SigninSignup/EmailVerify'

const Signup = () => {
  const api = useApi()
  const formData = useRef({})
  const [step, setStep] = useState(0)
  const [emailSent, setEmailSent] = useState(false)
  const handleBack = () => {
    api.setStatus.reset()
    setStep(0)
  }

  const finalSubmit = async () => {
    const data = await api.post(
      '/account/signup',
      getFormData(formData.current)
    )

    if (!data) {
      if (api.error !== 'OTP did not match') {
        setStep(0)
      }

      return
    }
    $store(user.jwt(data.token))
  }

  const handleSignupSubmit = (values) => {
    if (values.password !== values.confirmPassword) {
      return api.setStatus('Please enter a password')
    }
    delete formData.current.confirmPassword

    if (values.avatar.length) {
      values.avatar = values.avatar[0]
    } else {
      delete values.avatar
    }

    const userEmail = formData.current.email
    const otpCode = formData.current.code
    if (userEmail && otpCode) {
      formData.current = {
        email: userEmail,
        code: otpCode,
        ...values,
      }
      return finalSubmit()
    }

    formData.current = values
    api.setStatus.reset()
    setStep(1)
  }

  const handleEmailSubmit = async ({ email }) => {
    if (email) formData.current.email = email
    else email = formData.current.email
    const data = await api.post('/account/request-email-verify', {
      email,
    })
    if (!data) return
    setEmailSent(true)
  }

  const handleCodeSubmit = ({ code }) => {
    formData.current.code = code
    finalSubmit()
  }

  useEffect(() => {
    if (step !== 1) setEmailSent(false)
  }, [step])

  return (
    <SigninSignup>
      <SignupForm
        hidden={step !== 0}
        onSubmit={handleSignupSubmit}
        loading={api.loading}
        error={api.error}
      />

      <EmailVerify
        hidden={step !== 1}
        onBack={handleBack}
        showCodeInput={emailSent}
        onResend={handleEmailSubmit}
        onSubmit={emailSent ? handleCodeSubmit : handleEmailSubmit}
        loading={api.loading}
        error={api.error}
      />
    </SigninSignup>
  )
}

export default Signup
