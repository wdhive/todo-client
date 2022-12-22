import css from './Error.module.scss'

const ErrorHandler = ({ error, errorInfo }) => {
  const handleReload = () => {
    location.reload()
  }

  return (
    <div className={css.error}>
      <h1>Error</h1>
      <p>{error.message}</p>

      <button onClick={handleReload}>Reload</button>
    </div>
  )
}

export default ErrorHandler
