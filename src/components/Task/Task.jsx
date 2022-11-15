import css from './Task.module.scss'
import EditIcon from '@ass/icons/edit.svg?component'
import DeleteIcon from '@ass/icons/delete.svg?component'
import ClockIcon from '@ass/icons/clock.svg?component'
import CheckIcon from '@ass/icons/check.svg?component'
import avatar from '@ass/avatar.png'

{
  const activeClassName = `.${css.Task}.${css.contextActive}`
  const removeActiveElements = (except) => {
    const activeElements = document.querySelectorAll(activeClassName)
    activeElements.forEach((el) => {
      if (el === except) return
      el.classList.remove(css.contextActive)
    })
  }
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault()
    const closest = e.target.closest(`.${css.Task}`)
    removeActiveElements(closest)
    if (!closest) return
    closest.classList.toggle(css.contextActive)
  })
  document.addEventListener('click', (e) => {
    const closest = e.target.closest(`.${css.Task}`)
    removeActiveElements(closest)
  })
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') return
    removeActiveElements()
  })
}

const Task = () => {
  return (
    <div className={css.Task}>
      <div className={css.main}>
        <div className={css.top}>
          <h6>Muri Khaw</h6>
          <input
            className={css.checkBox}
            type="checkbox"
            defaultChecked={true}
          />

          <div
            onClick={({ currentTarget }) =>
              currentTarget.previousElementSibling.click()
            }
          >
            <CheckIcon />
          </div>
        </div>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
          sunt...
        </p>

        <div className={css.bottom}>
          <div className={css.time}>
            <ClockIcon />
            <p>12:30 PM</p>
          </div>

          <div className={css.users}>
            {[avatar, avatar, avatar].map((user, ind) => {
              return <img key={ind} src={user} alt={user} />
            })}
          </div>
        </div>
      </div>

      <div className={css.context}>
        <button>
          <EditIcon />
        </button>
        <button>
          <DeleteIcon />
        </button>
      </div>
    </div>
  )
}

export default Task
