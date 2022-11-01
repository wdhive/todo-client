import { useState, useEffect, useRef } from 'react'
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
  const handleBack = () => setStep((prev) => --prev)

  const handleSigninSubmit = async (values) => {
    const [err, data] = await api.post('/account/login', values)
    dispatch(user.addJwt(data.token))
  }

  const handleEmailSubmit = async ({ email }) => {
    formData.current.email = email
    const [err, data] = await api.post('/account/password-forget', { email })
    setEmailSent(true)
  }

  const handleCodeSubmit = async ({ code }) => {
    formData.current.code = code
    setStep(2)
  }

  const handleResetPassSubmit = async (body) => {
    const [err, data] = await api.post('/account/password-reset', {
      ...body,
      ...formData.current,
    })
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
        onForgetPass={() => setStep(1)}
      />

      <EmailVerify
        length="8"
        hidden={step !== 1}
        onBack={handleBack}
        showCodeInput={emailSent}
        onSubmit={emailSent ? handleCodeSubmit : handleEmailSubmit}
      />

      <ResetPassword
        hidden={step !== 2}
        onSubmit={handleResetPassSubmit}
        onBack={handleBack}
      />
    </SigninSignup>
  )
}

export default Signin
