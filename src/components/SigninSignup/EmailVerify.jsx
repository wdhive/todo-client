import css from './EmailVerify.module.scss'
import SubForm from './SubForm'
import { Group } from './FormUtils'

const EmailVerify = ({ showCodeInput = false, resendTime, ...props }) => {
  if (showCodeInput && resendTime) {
    props.statusText = `wait for d ${resendTime}`
  }

  return (
    <SubForm {...props} buttonLabel={showCodeInput ? 'Enter' : 'Send OTP'}>
      <Group label="Email">
        <input type="email" name="" id="" />
      </Group>

      {showCodeInput && (
        <Group label="Code">
          <input
            className={css.codeInput}
            // pattern="[a-zA-Z0-9]"
            maxLength="6"
            type="text"
            title="Code only caontain letter and numbers"
          />
        </Group>
      )}
    </SubForm>
  )
}

export default EmailVerify
