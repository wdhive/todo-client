import SubForm from './SubForm'
import { Group } from './FormUtils'

const EmailVerify = ({
  length = 6,
  showCodeInput = false,
  onResend,
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
            minLength={length}
            maxLength={length}
            type="text"
            title="Code only caontain letter and numbers"
          />
        </Group>
      )}

      {showCodeInput && !props.loading && (
        <button
          type="button"
          onClick={onResend}
          style={{
            color: 'var(--accent)',
            fontSize: '1.5rem',
            textDecoration: 'underline',
            cursor: 'pointer',
            background: 'none',
            border: 'none',
            fontWeight: 400,
          }}
        >
          Send code again
        </button>
      )}
    </SubForm>
  )
}

export default EmailVerify
