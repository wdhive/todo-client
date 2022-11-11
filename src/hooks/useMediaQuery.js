import { useEffect, useState } from 'react'

const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false)

  const handleMedia = ({ matches }) => {
    setMatches(matches)
  }

  useEffect(() => {
    const media = matchMedia(query)
    handleMedia(media)
    media.addEventListener('change', handleMedia)
    return () => media.removeEventListener('change', handleMedia)
  }, [])

  return matches
}

export default useMediaQuery
