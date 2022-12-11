import { AiOutlineDelete } from 'react-icons/ai'
import css from './FloatingContent.module.scss'
import Dropdown from '$ui/Dropdown'
import { memo } from 'react'

const FloatingContent = ({
  float = false,
  taskId,
  showModify,
  onDelete,
  pending,
  active,
  ...props
}) => {
  return (
    <div className={cn(css.FloatingContent, float && css.float)}>
      <Dropdown
        {...props}
        className={cn(
          css.Dropdown,
          active === true ? css.active : active === false && css.inactive
        )}
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
