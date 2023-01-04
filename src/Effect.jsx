import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import useEffectExceptOnMount from 'use-effect-except-on-mount'
import useInterval from '$hooks/useInterval'
import updateSocket from '$socket'
import User from '$slice/User'
import Tasks from '$slice/Tasks'
import Settings from '$slice/Settings'
import reactApi, { useApi } from '$api/react'
import { setLocalStroage } from '$utils/utils'
let prevJwt

const Effect = ({ hue, jwt }) => {
  const api = useApi()
  const isJwt = useRef()
  isJwt.current = Boolean(jwt)
  const socketId = useSelector((state) => state.user.socketId)
  const theme = useSelector((state) => state.settings.theme)
  useNotificationPermission()

  // JWT change
  useMemo(() => {
    reactApi.instance.defaults.headers.common.authorization = jwt
      ? `Bearer ${jwt}`
      : undefined
    updateSocket(jwt)

    prevJwt = jwt
    setLocalStroage('jwt-token', jwt)
  }, [jwt])

  // Logout
  useEffectExceptOnMount(() => {
    if (jwt) return
    $store(User.initial())
    $store(Tasks.initial())
    $store(Settings.initial())
  }, [jwt])

  // Sync JWT With localStorage
  useInterval(() => {
    const jwt = localStorage.getItem('jwt-token')
    if (jwt === prevJwt) return
    $store(User.jwt(jwt))
  }, 666)

  // Update sockeid
  useEffect(() => {
    reactApi.instance.defaults.headers.common['exclude-socket'] = socketId
  }, [socketId])

  // Update theme
  useEffect(() => {
    document.documentElement.setAttribute(
      'theme',
      theme ? (theme.endsWith('dark') ? 'dark' : 'light') : 'light'
    )
    setLocalStroage(
      'app-theme',
      theme && theme.startsWith('auto') ? 'auto' : theme
    )
  }, [theme])

  // Update theme
  useEffect(() => {
    setLocalStroage('app-theme-hue', hue)
  }, [hue])

  // Update theme
  useEffectExceptOnMount(() => {
    if (!isJwt.current) return

    const timeout = setTimeout(async () => {
      await api.patch('/user/settings', { hue })
    }, 1000)
    return () => clearTimeout(timeout)
  }, [hue])

  return <></>
}

const useNotificationPermission = () => {
  const [permission, setPermission] = useState(
    () => window.Notification && Notification.permission
  )

  const handleEvent = useCallback(() => {
    if (!window.Notification) return
    Notification.requestPermission((data) => setPermission(data))
  }, [])

  useEffect(() => {
    if (permission === undefined || permission === 'granted') return

    document.addEventListener('pointerdown', handleEvent)
    document.addEventListener('keydown', handleEvent)

    return () => {
      document.removeEventListener('pointerdown', handleEvent)
      document.removeEventListener('keydown', handleEvent)
    }
  }, [permission])
}

export default memo(Effect)
