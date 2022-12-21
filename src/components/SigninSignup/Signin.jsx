import MainForm from './MainForm'
import { Group } from './FormUtils'
import InputPassword from '$ui/InputPassword'

const Signin = ({ onForgetPass = () => {}, ...props }) => {
  return (
    <MainForm {...props} type="signin">
      <Group label="Email or Username">
        <input
          required
          type="text"
          name="login"
          title="Please enter a valid email or username Hello sunte paitecho?"
        />
      </Group>

      <Group label="Password">
        <InputPassword type="password" name="password" required />
      </Group>

      <button
        onClick={onForgetPass}
        type="button"
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
        Forget password?
      </button>
    </MainForm>
  )
}

export default Signin
