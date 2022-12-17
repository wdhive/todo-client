import { memo, useEffect } from 'react'

import css from './Loading.module.scss'
import Logo from '$assets/logo/moderate-1.svg?component'

let initial = true

const Loading = ({ scoped = false }) => {
  useEffect(() => {
    initial = false
  }, [])

  return (
    <div
      main-loading-component=""
      className={cn(css.loading, scoped && css.scoped)}
    >
      {initial && <Logo />}

      <span className={css.loader}></span>
    </div>
  )
}

export default memo(Loading)
