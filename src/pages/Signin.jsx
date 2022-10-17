import SigninSignup from '@lay/SigninSignup'
import SigninForm from '@com/SigninSignup/Signin'
import ResetPassword from '@com/SigninSignup/ResetPassword'
import EmailVerify from '@com/SigninSignup/EmailVerify'

const Signin = () => {
  return (
    <SigninSignup>
      {/* <SigninForm /> */}
      {/* <ResetPassword /> */}
      <EmailVerify />
    </SigninSignup>
  )
}

export default Signin
