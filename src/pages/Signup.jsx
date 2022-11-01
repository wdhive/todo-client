import { useRef, useState, useEffect } from 'react'
import useStatus from '@hooks/useStatus'
import { useDispatch } from 'react-redux'
import api from '@api'
import user from '@store/slice/user'
import SigninSignup from '@lay/SigninSignup'
import SignupForm from '@com/SigninSignup/Signup'
import EmailVerify from '@com/SigninSignup/EmailVerify'

const Signup = () => {
  const dispatch = useDispatch()
  const formData = useRef({})
  const [step, setStep] = useState(0)
  const [emailSent, setEmailSent] = useState(false)
  const [hasError, isLoading, setStatus] = useStatus()
  const handleBack = () => {
    setStatus()
    setStep(0)
  }

  const handleSignupSubmit = (values) => {
    if (values.password !== values.confirmPassword) {
      return setStatus('Please enter a password')
    }
    formData.current = values
    setStatus()
    setStep(1)
  }

  const handleEmailSubmit = async ({ email }) => {
    if (email) formData.current.email = email
    else email = formData.current.email

    setStatus('loading')
    const [err, data] = await api.post('/account/request-email-verify', {
      email,
    })

    if (setStatus(err)) return
    setEmailSent(true)
  }

  const handleCodeSubmit = async ({ code }) => {
    formData.current.code = code
    delete formData.current.avatar
    delete formData.current.confirmPassword

    setStatus('loading')
    const [err, data] = await api.post('/account/signup', formData.current)

    if (setStatus(err)) return
    dispatch(user.addJwt(data.token))
  }

  useEffect(() => {
    if (step !== 1) setEmailSent(false)
  }, [step])

  return (
    <SigninSignup>
      <SignupForm
        hidden={step !== 0}
        onSubmit={handleSignupSubmit}
        loading={isLoading}
        error={hasError}
      />

      <EmailVerify
        hidden={step !== 1}
        onBack={handleBack}
        showCodeInput={emailSent}
        onResend={handleEmailSubmit}
        onSubmit={emailSent ? handleCodeSubmit : handleEmailSubmit}
        loading={isLoading}
        error={hasError}
      />
    </SigninSignup>
  )
}

export default Signup
