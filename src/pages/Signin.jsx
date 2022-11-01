import { useState, useEffect, useRef } from 'react'
import useStatus from '@hooks/useStatus'
import { useDispatch } from 'react-redux'
import api from '@api'
import user from '@store/slice/user'
import SigninSignup from '@lay/SigninSignup'
import SigninForm from '@com/SigninSignup/Signin'
import ResetPassword from '@com/SigninSignup/ResetPassword'
import EmailVerify from '@com/SigninSignup/EmailVerify'

const Signin = () => {
  const dispatch = useDispatch()
  const formData = useRef({})
  const [step, setStep] = useState(0)
  const [emailSent, setEmailSent] = useState(false)
  const [hasError, isLoading, setStatus] = useStatus()
  const handleBack = () => {
    setStep((prev) => --prev)
    setStatus()
  }
  const handleForgetPass = () => {
    setStep(1)
    setStatus()
  }

  const handleSigninSubmit = async (values) => {
    setStatus('loading')
    const [err, data] = await api.post('/account/login', values)

    if (setStatus(err)) return
    dispatch(user.addJwt(data.token))
  }

  const handleEmailSubmit = async ({ email }) => {
    if (email) formData.current.email = email
    else email = formData.current.email
    setStatus('loading')
    const [err, data] = await api.post('/account/password-forget', { email })

    if (setStatus(err)) return
    setEmailSent(true)
  }

  const handleCodeSubmit = async ({ code }) => {
    formData.current.code = code
    setStatus()
    setStep(2)
  }

  const handleResetPassSubmit = async (body) => {
    setStatus('loading')
    const [err, data] = await api.post('/account/password-reset', {
      ...body,
      ...formData.current,
    })

    if (setStatus(err)) return
    dispatch(user.addJwt(data.token))
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
        loading={isLoading}
        error={hasError}
      />

      <EmailVerify
        length="8"
        hidden={step !== 1}
        onBack={handleBack}
        showCodeInput={emailSent}
        onSubmit={emailSent ? handleCodeSubmit : handleEmailSubmit}
        onResend={handleEmailSubmit}
        loading={isLoading}
        error={hasError}
      />

      <ResetPassword
        hidden={step !== 2}
        onSubmit={handleResetPassSubmit}
        onBack={handleBack}
        loading={isLoading}
        error={hasError}
      />
    </SigninSignup>
  )
}

export default Signin
