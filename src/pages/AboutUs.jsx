import useApi from '$api/useApi'
import useApiOnce from '$api/useApiOnce'

const AboutUs = () => {
  const a = useApiOnce('get', '/ping')

  console.log(a.status)

  return (
    <h1
      onClick={async () => {
        a.retry()
        // const data = await a.get('/piddng')
        // console.log(data)
      }}
    >
      AboutUs
    </h1>
  )
}

export default AboutUs
