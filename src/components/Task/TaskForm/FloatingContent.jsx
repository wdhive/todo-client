import { AiOutlineDelete } from 'react-icons/ai'
import css from './FloatingContent.module.scss'
import Dropdown from '$components/UI/Dropdown'
import { memo } from 'react'

const FloatingContent = ({
  float = false,
  role,
  taskId,
  showModify,
  onDelete,
  pending,
  active = true,
  ...props
}) => {
  return (
    <div
      className={cn(
        css.FloatingContent,
        float && css.float,
        active || css.inactive
      )}
    >
      <Dropdown
        {...props}
        className={cn(css.Dropdown, pending && css.pending)}
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

      {showModify && (
        <button className={css.addButton} type="button" onClick={onDelete}>
          <AiOutlineDelete />
        </button>
      )}
    </div>
  )
}

export default memo(FloatingContent)
