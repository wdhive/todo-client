import SubForm from './SubForm'
import { Group } from './FormUtils'

const EmailVerify = ({
  length = 6,
  showCodeInput = false,
  resendTime,
  ...props
}) => {
  if (showCodeInput && resendTime) {
    props.statusText = `wait for d ${resendTime}`
  }

  return (
    <SubForm {...props} buttonLabel={showCodeInput ? 'Enter' : 'Send OTP'}>
      <Group label="Email">
        <input type="email" name="email" required disabled={showCodeInput} />
      </Group>

      {showCodeInput && (
        <Group label="Code">
          <input
            name="code"
            required
            style={{ textAlign: 'center' }}
            // pattern="[a-zA-Z0-9]"
            minLength={length}
            maxLength={length}
            type="text"
            title="Code only caontain letter and numbers"
          />
        </Group>
      )}
    </SubForm>
  )
}

export default EmailVerify
