// @flow
import * as React from 'react'
import socketClient from 'socket.io-client'

import SocketContext from './SocketContext'

export default function SocketProvider({ config = {}, children }) {
  const { port = 80 } = config

  const client = socketClient(`http://localhost:${port}`)
  client.on('connect', function() {
    // console.log('Client connected', this.client.id)
  })

  return (
    <SocketContext.Provider value={{ socketClient: client }}>
      {children}
    </SocketContext.Provider>
  )
}
