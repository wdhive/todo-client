import css from './HueRange.module.scss'

const HueRange = ({ className, ...props }) => {
  return (
    <input
      className={cn(css.HueRange, className)}
      min="0"
      max="360"
      type="range"
      {...props}
    />
  )
}

export default HueRange
