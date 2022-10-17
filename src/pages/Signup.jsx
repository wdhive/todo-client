import SigninSignup from '@lay/SigninSignup'
import SignupForm from '@com/SigninSignup/Signup'
import EmailVerify from '@com/SigninSignup/EmailVerify'

const Signup = () => {
  return (
    <SigninSignup>
      <SignupForm />
      {/* <EmailVerify resendTime="hello world" /> */}
    </SigninSignup>
  )
}

export default Signup
