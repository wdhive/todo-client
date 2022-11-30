import css from './index.module.scss'
import loadingCss from '$components/Loading.module.scss'
import warningIcon from '$assets/icons/warning.svg?raw'
import PlainHTML from './index.html?raw'
import Render from '../Render'

export default (title = 'Are you sure?', description = '') => {
  let isLoading = false
  const dialog = Render(PlainHTML.replace('{{svg}}', warningIcon), {
    ...css,
    ...loadingCss,
  })
  dialog.showModal()

  dialog.querySelector(`.${css.title} h4`).innerHTML = title
  dialog.querySelector(`.${css.title} p`).innerHTML = description

  return new Promise((resolve) => {
    const submit = (result) => {
      if (isLoading) return
      isLoading = true
      dialog.setAttribute('loading', '')

      resolve({
        result,
        close() {
          dialog.remove()
        },
      })
    }

    dialog.oncancel = (e) => {
      e.preventDefault()
      submit(false)
    }

    dialog.querySelector(`.${css.backdrop}`).onclick = () => {
      submit(false)
    }

    dialog.querySelectorAll(`.button`).forEach((button) => {
      button.onclick = () => {
        submit(Boolean(button.dataset.ok))
      }
    })
  })
}
