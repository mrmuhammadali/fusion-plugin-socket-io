// @flow
import browser from './browser'
import server from './server'
import { SocketIOConfigToken, SocketIOHandlersToken } from './tokens'
import withSocket from './withSocket'

export { SocketIOConfigToken, SocketIOHandlersToken, withSocket }

export default (__NODE__ ? server : browser)
