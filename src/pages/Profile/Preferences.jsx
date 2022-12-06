import Theme from '$components/Profile/Preferences/Theme'
// import FontSize from '$components/Profile/Preferences/FontSize'
import Collection from '$components/Profile/Preferences/Collection'

const Group = ({ children, label }) => {
  return (
    <div style={{ marginBottom: '4rem' }}>
      <h6
        style={{
          marginBottom: '1rem',
          fontWeight: '700',
          // display: 'flex',
          // alignItems: 'center',
          // gap: '0.5rem',
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

      {/* <Group
        label={
          <>
            Font Size
            <div style={{ fontSize: '1.25rem', fontWeight: '500' }}>
              (Not recomended, update from browser settings)
            </div>
          </>
        }
      >
        <FontSize />
      </Group> */}

      <Group label="Collections">
        <Collection />
      </Group>
    </>
  )
}

export default Preferences
