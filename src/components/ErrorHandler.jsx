import css from './ErrorHandler.module.scss'

const ErrorHandler = () => {
  const handleReload = () => {
    location.reload()
  }

  return (
    <div className={css.error}>
      <h1>Error</h1>
      <button onClick={handleReload}>Reload</button>
    </div>
  )
}

export default ErrorHandler
