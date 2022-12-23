import { useMemo, useState } from 'react'
import { useApi } from '$api/react'

import Layout from './Layout'
import ChangeEmail from './Advanced/ChangeEmail'
import ChangePassword from './Advanced/ChangePassword'
import ChangeUsername from './Advanced/ChangeUsername'
import DeleteAccount from './Advanced/DeleteAccount'

const components = {
  'Change Email': ChangeEmail,
  'Change Password': ChangePassword,
  'Change Username': ChangeUsername,
  'Delete Account': DeleteAccount,
}

const Advanced = () => {
  const [active, setActive] = useState(false)
  const api = useApi()

  const activeComponents = useMemo(() => {
    const CurrentComponent = components[active]
    if (!CurrentComponent) return

    return <CurrentComponent api={api} goBack={setActive} />
  }, [active, api])

  const icactiveComponents = useMemo(() => {
    if (active) return
    return Object.keys(components).map((name) => (
      <button
        key={name}
        className={cn(
          'button',
          name.toLowerCase().startsWith('delete')
            ? 'button__red'
            : 'button__primary'
        )}
        onClick={() => setActive(name)}
      >
        {name}
      </button>
    ))
  }, [])

  return <Layout>{active ? activeComponents : icactiveComponents}</Layout>
}

export default Advanced
