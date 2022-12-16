import css from './Layout.module.scss'

const Layout = ({ children, className }) => {
  return <div className={cn(css.Layout, className)}>{children}</div>
}

export default Layout
