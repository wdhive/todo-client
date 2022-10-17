import SigninSignup from '@lay/SigninSignup'
import SignupForm from '@com/SigninSignup/Signup'
import EmailVerify from '@com/SigninSignup/EmailVerify'

const Signup = () => {
  return (
    <SigninSignup>
      <SignupForm />
      <EmailVerify />
    </SigninSignup>
  )
}

export default Signup
