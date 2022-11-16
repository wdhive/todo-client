import { useRef, useState, useEffect } from 'react'
import user from '$slice/user'
import SigninSignup from '$layouts/SigninSignup'
import SignupForm from '$components/SigninSignup/Signup'
import EmailVerify from '$components/SigninSignup/EmailVerify'
import { getFormData } from '$utils/utils'

const Signup = () => {
  const api = useApi()
  const formData = useRef({})
  const [step, setStep] = useState(0)
  const [emailSent, setEmailSent] = useState(false)
  const handleBack = () => {
    api.reset()
    setStep(0)
  }

  const handleSignupSubmit = (values) => {
    if (values.password !== values.confirmPassword) {
      return api.setStatus('Please enter a password')
    }
    formData.current = values
    api.reset()
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

  const handleCodeSubmit = async ({ code }) => {
    delete formData.current.confirmPassword
    formData.current.code = code
    if (formData.current.avatar) {
      formData.current.avatar = formData.current.avatar[0]
    }

    const data = await api.post(
      '/account/signup',
      getFormData(formData.current)
    )
    if (!data) return
    $store(user.login(data.token))
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
