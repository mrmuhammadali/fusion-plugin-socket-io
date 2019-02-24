/** Copyright (c) 2018 Uber Technologies, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import { createToken, type Token } from 'fusion-core'
import { Socket } from 'socket.io'

export const SocketIOToken: Token<any> = createToken('SocketIO')

export type HandlerType = { [string]: (data: any, socket: Socket) => any }
export const SocketIOHandlersToken: Token<HandlerType> = createToken(
  'SocketIOHandlersToken',
)
export const SocketIOConfigToken: Token<{
  port: number,
  origins: string | Array<string>,
}> = createToken('SocketIOConfigToken')
