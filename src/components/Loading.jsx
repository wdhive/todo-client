import { memo, useEffect } from 'react'
import { createPortal } from 'react-dom'
import css from './Loading.module.scss'
import Logo from '@ass/logo/moderate-1.svg?component'
let initial = true

const Loading = ({ global = true }) => {
  useEffect(() => {
    initial = false
  }, [])

  const html = (
    <div className={css.loading}>
      {initial && <Logo />}

      <span className={css.loader}></span>
    </div>
  )

  if (!global) return html
  return createPortal(html, document.getElementById('Root-Loading'))
}

export default memo(Loading)
