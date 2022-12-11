import ListItem from './ListItem'

const index = ({ notifications }) => {
  return (
    <div>
      {[...notifications].reverse().map((n) => (
        <ListItem key={n._id} notification={n} />
      ))}
    </div>
  )
}

export default index
