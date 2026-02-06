'use client'

import { useEffect, useRef, useState } from 'react'
import { io } from 'socket.io-client'
import { config } from '@/lib/config'

export function useSocket() {
  const socketRef = useRef(null)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    if (socketRef.current) return

    const socket = io(config.SOCKET_URL, {
      auth: {
        userId: config.CURRENT_USER_ID, // required
      },
      transports: ['websocket'],
    })

    socketRef.current = socket

    socket.on('connect', () => {
      console.log('[socket] connected', socket.id)
      setIsConnected(true)
    })

    socket.on('disconnect', () => {
      console.log('[socket] disconnected')
      setIsConnected(false)
    })

    socket.on('connect_error', (err) => {
      console.error('[socket] error:', err.message)
    })

    return () => {
      socket.disconnect()
      socketRef.current = null
    }
  }, [])

  return { socket: socketRef.current, isConnected }
}

