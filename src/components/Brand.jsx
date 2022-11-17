import { memo } from 'react'
import css from './Brand.module.scss'
import Logo from '$assets/logo/moderate-1.svg?component'

const Brand = () => {
  return (
    <div className={css.logo}>
      <Logo />
      <h4>todo</h4>
    </div>
  )
}

export default memo(Brand)
