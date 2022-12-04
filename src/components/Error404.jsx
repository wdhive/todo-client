import css from './Error404.module.scss'
import Icon404 from '$assets/icons/404.svg?component'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div className={css.NotFound}>
      <div className={css.notFound}>
        <div className={css.content}>
          <div className="wrapper">
            <p className={css.topSubtitle}>404 Error</p>

            <h3>Page not found</h3>

            <p className={css.subtitle}>
              Sorry, the page you are looking for doesn't exist. Here are some
              helpful links:
            </p>

            <div className={css.links}>
              <button
                className="button button__secondary"
                onClick={() => navigate(-1)}
              >
                Go back
              </button>
              <button
                className="button button__primary"
                onClick={() => navigate('/')}
              >
                Home
              </button>
            </div>
          </div>
        </div>

        <div className={css.image404}>
          <div className="wrapper">
            <Icon404 />
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound
