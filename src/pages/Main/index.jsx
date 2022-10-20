import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'

const Main = () => {
  const user = useSelector(state => state.user)
  console.log({ user })

  return (
    <>
      <h1>Main</h1>
      <Outlet />
      <h1>Nav....</h1>
    </>
  )
}

export default Main
