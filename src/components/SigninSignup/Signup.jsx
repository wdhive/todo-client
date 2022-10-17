import MainForm from './MainForm'
import { Group } from './FormUtils'

const Signup = props => {
  return (
    <MainForm {...props} type="signup">
      {/* <div className={css.imageGroup}>
          <input type="file" name="" id="" />
        </div> */}

      <Group label="Full Name*">
        <input type="text" />
      </Group>

      <Group label="Username*">
        <input type="text" />
      </Group>

      <Group label="Password*">
        <input type="text" />
      </Group>

      <Group label="Confirm Password*">
        <input type="text" />
      </Group>
    </MainForm>
  )
}

export default Signup
