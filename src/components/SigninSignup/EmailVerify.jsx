import css from './EmailVerify.module.scss'
import SubForm from './SubForm'
import { Group } from './FormUtils'

const countMap = (count, fn) => {
  const array = []
  array.length = count
  array.fill(null)
  return array.map((el, ind) => fn(ind))
}

const EmailVerify = ({ codeCount = 1, props }) => {
  return (
    <SubForm {...props} buttonLabel="Send OTP" statusText="hello world">
      <Group label="Email">
        <input type="email" name="" id="" />
      </Group>

      <Group label="Code">
        {countMap(codeCount, ind => {
          return (
            <input key={ind} className={css.input} maxLength="1" type="email" />
          )
        })}
      </Group>
    </SubForm>
  )
}

export default EmailVerify
