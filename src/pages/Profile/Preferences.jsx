import Theme from '$components/Profile/Preferences/Theme'
import FontSize from '$components/Profile/Preferences/FontSize'
import Collection from '$components/Profile/Preferences/Collection'

const Group = ({ children, label }) => {
  return (
    <div style={{ marginBottom: '3rem' }}>
      <h6 style={{ marginBottom: '0.5rem', fontWeight: '600' }}>{label}</h6>

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

      <Group label="Font Size">
        <FontSize />
      </Group>

      <Group label="Collections">
        <Collection />
      </Group>
    </>
  )
}

export default Preferences
