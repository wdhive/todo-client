import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import css from './Layout.module.scss'
import Nav from '@com/Nav'

const MainLayout = () => {
  const user = useSelector((state) => state.user)
  console.log({ user })

  return (
    <div className={css.Layout}>
      <Nav />
      <Outlet />
    </div>
  )
}

export default MainLayout
