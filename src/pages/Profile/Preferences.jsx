import Theme from '$components/Profile/Preferences/Theme'
import Collection from '$components/Profile/Preferences/Collection'

const Group = ({ children, label }) => {
  return (
    <div style={{ marginBottom: '4rem' }}>
      <h6
        style={{
          marginBottom: '1rem',
          fontWeight: '700',
        }}
      >
        {label}
      </h6>

      {children}
    </div>
  )
}

const Preferences = () => {
  return (
    <>
      <Group label="Theme">
        <Theme />
      </Group>

      <Group label="Collections">
        <Collection />
      </Group>
    </>
  )
}

export default Preferences
