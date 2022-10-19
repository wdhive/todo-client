import { Group } from './FormUtils'
import MainForm from './MainForm'

const Signin = ({ onForgetPass = () => {}, ...props }) => {
  return (
    <MainForm {...props} type="signin">
      <Group label="Email or Username">
        <input type="text" />
      </Group>

      <Group label="Password">
        <input type="password" />
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
