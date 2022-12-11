import css from './Advanced.module.scss'
import containerCss from './Container.css.js'
import ChangeEmail from './ChangeEmail'
import ChangePassword from './ChangePassword'
import ChangeUsername from './ChangeUsername'
import DeleteAccount from './DeleteAccount'
import { FormGroup } from './Common'

const Advanced = () => {
  return (
    <div className={cn(containerCss.Container, css.Advanced)}>
      <ChangeEmail />
      <ChangePassword />
      <ChangeUsername />
      <DeleteAccount />

      <FormGroup label="Danger Zone">
        <button className={cn('button', 'button__red')}>Delete Account</button>
      </FormGroup>
    </div>
  )
}

export default Advanced
