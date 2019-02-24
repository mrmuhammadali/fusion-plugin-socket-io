// @flow
import * as React from 'react'
import { createPlugin } from 'fusion-core'

import { SocketIOConfigToken } from './tokens'
import SocketProvider from './SocketProvider'

const plugin = createPlugin({
  deps: {
    config: SocketIOConfigToken.optional,
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

export default plugin
