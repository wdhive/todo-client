import { useState } from 'react'
import css from './index.module.scss'

const index = ({ list }) => {
  const [isOpen, setIsOpen] = useState(true)
  const [selectedValue, setSelectedValue] = useState('none')
  const handleButtonClick = () => {
    setIsOpen((prev) => !prev)
  }
  const handleButtonBlur = () => {
    setTimeout(() => {
      setIsOpen(false)
    }, 1000)
  }

  const content = (
    // <section>
    <ul>
      {list.map((item) => (
        <li
          key={item.value}
          value={item.value}
          active={selectedValue === item.value ? '' : undefined}
          onClick={() => setSelectedValue(item.value)}
        >
          {item.label}
        </li>
      ))}
    </ul>
    /* </section> */
  )

  console.log(selectedValue)

  return (
    <div className={css.Dropdown}>
      <button
        type="button"
        // onClick={handleButtonClick}
        // onBlur={handleButtonBlur}
      >
        Open
      </button>

      {isOpen && content}
    </div>
  )
}

export default index
