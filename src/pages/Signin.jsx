import { useState, useEffect, useRef } from 'react'
import user from '$slice/user'
import SigninSignup from '$layouts/SigninSignup'
import SigninForm from '$components/SigninSignup/Signin'
import ResetPassword from '$components/SigninSignup/ResetPassword'
import EmailVerify from '$components/SigninSignup/EmailVerify'
import useApi from '$api/useApi'

const Signin = () => {
  const api = useApi()
  const formData = useRef({})
  const [step, setStep] = useState(0)
  const [emailSent, setEmailSent] = useState(false)
  const handleBack = () => {
    setStep((prev) => --prev)
    api.reset()
  }
  const handleForgetPass = () => {
    setStep(1)
    api.reset()
  }

  const handleSigninSubmit = async (values) => {
    const data = await api.post('/account/login', values)
    if (!data) return
    $store(user.jwt(data.token))
  }

  const handleEmailSubmit = async ({ email }) => {
    if (email) formData.current.email = email
    else email = formData.current.email
    const data = await api.post('/account/password-forget', {
      email,
    })
    if (!data) return
    setEmailSent(true)
  }

  const handleCodeSubmit = async ({ code }) => {
    formData.current.code = code
    api.reset()
    setStep(2)
  }

  const handleResetPassSubmit = async (body) => {
    const data = await api.post('/account/password-reset', {
      ...body,
      ...formData.current,
    })
    if (!data) return
    $store(user.jwt(data.token))
  }

  useEffect(() => {
    if (step === 0) {
      formData.current = {}
    }
    if (step !== 1) setEmailSent(false)
  }, [step])

  return (
    <SigninSignup>
      <SigninForm
        hidden={step !== 0}
        onSubmit={handleSigninSubmit}
        onForgetPass={handleForgetPass}
        loading={api.loading}
        error={api.error}
      />

      <EmailVerify
        length="8"
        hidden={step !== 1}
        onBack={handleBack}
        showCodeInput={emailSent}
        onSubmit={emailSent ? handleCodeSubmit : handleEmailSubmit}
        onResend={handleEmailSubmit}
        loading={api.loading}
        error={api.error}
      />

      <ResetPassword
        hidden={step !== 2}
        onSubmit={handleResetPassSubmit}
        onBack={handleBack}
        loading={api.loading}
        error={api.error}
      />
    </SigninSignup>
  )
}

export default Signin
