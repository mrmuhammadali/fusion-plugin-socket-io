// @flow
import * as React from 'react'
import { createPlugin } from 'fusion-core'
import * as socketIO from 'socket.io'

import { SocketIOConfigToken, SocketIOHandlersToken } from './tokens'
import SocketProvider from './SocketProvider'

export default __NODE__ &&
  createPlugin({
    deps: {
      config: SocketIOConfigToken.optional,
      handlers: SocketIOHandlersToken,
    },
    provides: ({ config = {}, handlers }) => {
      const { port = 80, origins = '*:*' } = config
      const eventTypes = Object.keys(handlers)
      const io = socketIO(port)

      io.origins(origins)
      io.on('connection', socket => {
        eventTypes.forEach(eventType => {
          if (typeof handlers[eventType] === 'function') {
            socket.on(eventType, data => {
              handlers[eventType](data, socket)
            })
          }
        })

        socket.on('disconnect', () => {
          console.log('User disconnected')
        })
      })
    },
    middleware: ({ config = {} }) => {
      return async (ctx, next) => {
        if (!ctx.element) return next()
        ctx.element = (
          <SocketProvider config={config}>{ctx.element}</SocketProvider>
        )
        await next()
      }
    },
  })
