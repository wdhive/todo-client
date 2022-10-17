import { useState, useEffect } from 'react'
import SigninSignup from '@lay/SigninSignup'
import SigninForm from '@com/SigninSignup/Signin'
import ResetPassword from '@com/SigninSignup/ResetPassword'
import EmailVerify from '@com/SigninSignup/EmailVerify'

const Signin = () => {
  const [step, setStep] = useState(1)
  const [forgetEmailSent, setForgetEmailSent] = useState(false)
  const handleForgetPassword = () => setStep(2)
  const handleBack = () => setStep(curr => --curr)

  const handleSigninSubmit = () => {
    console.log('Signin')
  }

  const handleVerifyEmailSubmit = e => {
    setForgetEmailSent(true)

    if (forgetEmailSent) {
      setStep(3)
      console.log('Enter code')
    } else {
      console.log('Send email')
    }
  }

  const handleResetPassSubmit = () => {
    console.log('Change Password')
  }

  useEffect(() => {
    if (step !== 1) setForgetEmailSent(false)
  }, [step])

  return (
    <SigninSignup>
      {step === 1 && (
        <SigninForm
          onSubmit={handleSigninSubmit}
          onForgetPass={handleForgetPassword}
        />
      )}

      {step === 2 && (
        <EmailVerify
          onSubmit={handleVerifyEmailSubmit}
          resendTime={2100}
          onBack={handleBack}
          showCodeInput={forgetEmailSent}
        />
      )}

      {step === 3 && (
        <ResetPassword onSubmit={handleResetPassSubmit} onBack={handleBack} />
      )}
    </SigninSignup>
  )
}

export default Signin
