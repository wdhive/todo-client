import { useRef, useState } from 'react'
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

  const handleSignupSubmit = values => {
    if (values.password !== values.confirmPassword) {
      return alert('Please enter a password')
    }
    formData.current = values
    setStep(1)
  }

  const handleEmailSubmit = async ({ email }) => {
    formData.current.email = email
    const [err, data] = await api.post('/account/request-email-verify', {
      email,
    })

    setEmailSent(true)
  }

  const handleCodeSubmit = async ({ code }) => {
    formData.current.code = code
    delete formData.current.avatar
    delete formData.current.confirmPassword

    const [err, data] = await api.post('/account/signup', formData.current)
    dispatch(user.addJwt(data.token))
  }

  useEffect(() => {
    if (step !== 1) setEmailSent(false)
  }, [step])

  return (
    <SigninSignup>
      <SignupForm hidden={step !== 0} onSubmit={handleSignupSubmit} />

      <EmailVerify
        hidden={step !== 1}
        onBack={() => setStep(0)}
        showCodeInput={emailSent}
        onSubmit={emailSent ? handleCodeSubmit : handleEmailSubmit}
      />
    </SigninSignup>
  )
}

export default Signup
