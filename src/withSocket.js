// @flow
import React from 'react'

import SocketContext from './SocketContext'

type Options = {
  listener: string,
  emitter: string,
}

const withSocket = (options: Options = {}) => WrappedComponent => {
  const { emitter, listener } = options

  class SocketHandler extends React.Component {
    constructor(props) {
      super(props)
      const { socketClient } = props

      this.state = {
        [listener]: {},
        [emitter]: payload => {
          socketClient.emit(emitter, payload)
        },
      }
    }

    componentDidMount() {
      this.props.socketClient.on(listener, payload => {
        this.setState(() => ({ [listener]: payload }))
      })
    }

    componentWillUnmount() {
      this.props.socketClient.off(listener)
    }

    render() {
      return <WrappedComponent {...this.props} {...this.state} />
    }
  }

  return function SocketConsumer(props) {
    return (
      <SocketContext.Consumer>
        {socketContexts => <SocketHandler {...props} {...socketContexts} />}
      </SocketContext.Consumer>
    )
  }
}

export default withSocket
