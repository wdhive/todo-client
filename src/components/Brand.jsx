import css from './Brand.module.scss'
import Logo from '@ass/logo/moderate-1.svg?component'

const Brand = () => {
  return (
    <div className={css.logo}>
      <Logo />
      <h1>todo</h1>
    </div>
  )
}

export default Brand
