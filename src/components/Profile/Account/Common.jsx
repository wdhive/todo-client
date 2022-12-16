import css from './Common.module.scss'
import Button from '$ui/Button'

export const FormGroup = ({ children, label }) => {
  return (
    <div className={css.group}>
      {label && <p className={css.groupLabel}>{label}</p>}

      <div className={css.groupContent}>{children}</div>
    </div>
  )
}

export const AdvancedFormControls = ({ api, goBack, final, onNext }) => {
  return (
    <>
      {final && (
        <FormGroup label="Current password">
          <input required type="password" name="password" />
        </FormGroup>
      )}

      {api.error}

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
        }}
      >
        <Button
          loading={api.loading}
          className={'button button__primary'}
          onClick={(e) => {
            if (final) return
            e.preventDefault()
            onNext instanceof Function && onNext()
          }}
        >
          {final ? 'Save' : 'Next'}
        </Button>

        <button
          type="button"
          className={'button button__secondary'}
          onClick={() => goBack instanceof Function && goBack()}
        >
          Cancel
        </button>
      </div>
    </>
  )
}
