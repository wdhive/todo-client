import { memo, useEffect } from 'react'
import { createPortal } from 'react-dom'
import css from './Loading.module.scss'
import Logo from '@ass/logo/moderate-1.svg?component'
let initial = true

const Loading = ({ scoped = false }) => {
  useEffect(() => {
    initial = false
  }, [])

  const html = (
    <div className={cn(css.loading, scoped && css.scoped)}>
      {/* {initial && <Logo />} */}

      <span className={css.loader}></span>
    </div>
  )

  if (scoped) return html
  return createPortal(html, document.getElementById('Root-Loading'))
}

export default memo(Loading)
