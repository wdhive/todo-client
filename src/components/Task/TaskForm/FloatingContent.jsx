import { AiOutlineDelete } from 'react-icons/ai'
import css from './FloatingContent.module.scss'
import Dropdown from '$components/UI/Dropdown'

const FloatingContent = ({
  role = 'assigner',
  float = true,
  taskId,
  showModify = false,
}) => {
  console.log(taskId)

  return (
    <div className={cn(css.FloatingContent, float && css.float)}>
      <Dropdown
        className={css.Dropdown}
        default={role}
        classNames={{
          button: css.button,
          section: css.section,
          ul: css.ul,
          li: css.li,
        }}
        live
        list={[
          {
            label: 'Admin',
            value: 'admin',
          },
          {
            label: 'Moderator',
            value: 'moderator',
          },
          {
            label: 'Assigner',
            value: 'assigner',
          },
        ]}
      />

      {(taskId || showModify) && (
        <button className={css.addButton} type="button">
          <AiOutlineDelete />
        </button>
      )}
    </div>
  )
}

export default FloatingContent
